import PlaceOrder, { PlaceOrderCommand } from "application/usecase/PlaceOrder"
import { Coupon, CouponType } from "domain/entity/Coupon";
import { Product } from "domain/entity/Product";
import { TechnicalDetails } from "domain/entity/TechnicalDetails";
import { FAKE_CPF } from "../helpers/customer";
import { DaoFactory } from "domain/factory/DaoFactory";
import RepositoryFactory from "domain/factory/RepositoryFactory";
import BeanFactoryMem from "infra/BeanFactoryMem";

describe("PlaceOrder.ts", () => {

  let daoFactory: DaoFactory;
  let repositoryFactory: RepositoryFactory;

  beforeEach(async () => {
    const beaFactory = new BeanFactoryMem(1);
    daoFactory = beaFactory.dao();
    repositoryFactory = beaFactory.repositories();
  });

  const loadProductsDummies = async () => {
    const productRepository = repositoryFactory.createProductRepository();
    await productRepository.save(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10), 1));
    await productRepository.save(new Product('Item 2', '', 5000, new TechnicalDetails(20, 100, 50, 50), 2));
    await productRepository.save(new Product('Item 3', '', 30, new TechnicalDetails(1, 10, 10, 10), 3));
  }

  test('Should execute an order with total 4872', async () => {
    await repositoryFactory.createCouponRepository()
      .save(new Coupon("VALE20", 20, CouponType.PERCENTAGE));
    await loadProductsDummies();
    const placeOrder = new PlaceOrder(daoFactory, repositoryFactory);
    const command: PlaceOrderCommand = {
      cpf: FAKE_CPF,
      orderItems: [
        { idItem: 1, quantity: 1 },
        { idItem: 2, quantity: 1 },
        { idItem: 3, quantity: 3 }
      ],
      coupon: "VALE20",
      issueOrder: new Date()
    };
    const response = await placeOrder.execute(command);
    expect(response.total).toBe(5080);
  });

  test('Should return an order with code 202100000002', async () => {
    await repositoryFactory.createProductRepository()
      .save(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10), 1));
    const placeOrder = new PlaceOrder(daoFactory, repositoryFactory);
    await loadProductsDummies();

    const command: PlaceOrderCommand = {
      cpf: FAKE_CPF,
      orderItems: [
        { idItem: 1, quantity: 1 }
      ],
      issueOrder: new Date('2021-01-01T10:00:00')
    };
    await placeOrder.execute(command);
    const response = await placeOrder.execute(command);
    expect(response.code).toBe('202100000002');
  })

  test('Should not accept order when product not found', async () => {
    const placeOrder = new PlaceOrder(daoFactory, repositoryFactory);
    const command: PlaceOrderCommand = {
      cpf: FAKE_CPF,
      orderItems: [
        { idItem: 99, quantity: 1 }
      ],
      issueOrder: new Date()
    };
    await expect(async () => await placeOrder.execute(command))
      .rejects
      .toThrow(new Error('Product 99 not found!'));
  })
})