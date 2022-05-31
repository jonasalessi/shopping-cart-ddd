import PlaceOrder, { PlaceOrderCommand } from "../../src/application/usecase/PlaceOrder"
import { Coupon, CouponType } from "../../src/domain/entity/Coupon";
import { Product } from "../../src/domain/entity/Product";
import { TechnicalDetails } from "../../src/domain/entity/TechnicalDetails";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import RepositoryFactoryDatabase from "../../src/infra/repository/database/RepositoryFactoryDatabase";

describe("PlaceOrder.ts", () => {
 
  const CPF = '935.411.347-80';
  
  let repositoryFactory: RepositoryFactory;

  beforeAll(async () => {
    repositoryFactory = new RepositoryFactoryDatabase();
  });

  afterEach(() => {
    repositoryFactory.createOrderRepository().deleteAll();
    repositoryFactory.createCouponRepository().deleteAll();
  });

  const loadProductsDummies = async () => {
    const productRepository = repositoryFactory.createProductRepository();
    await productRepository.save(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10), 1));
    await productRepository.save(new Product('Item 2', '', 5000, new TechnicalDetails(20, 100, 50, 50), 2));
    await productRepository.save(new Product('Item 3', '', 30, new TechnicalDetails(1, 10, 10, 10), 3));
  }

  test('Should execute an order with total 4872', async () => {
    await repositoryFactory.createCouponRepository().save(new Coupon("VALE20", 20, CouponType.PERCENTAGE));
    await loadProductsDummies();
    const placeOrder = new PlaceOrder(repositoryFactory);
    const command: PlaceOrderCommand = {
      cpf: CPF,
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
    const placeOrder = new PlaceOrder(repositoryFactory);
    await loadProductsDummies();
    const command: PlaceOrderCommand = {
      cpf: CPF,
      orderItems: [
        { idItem: 1, quantity: 1 }
      ],
      issueOrder: new Date('2021-01-01T10:00:00')
    };
    await placeOrder.execute(command);
    const response = await placeOrder.execute(command);
    expect(response.code).toBe('202100000002');
  })

  test('Should not accept order with product invalid', async () => {
    const placeOrder = new PlaceOrder(repositoryFactory);
    const command: PlaceOrderCommand = {
      cpf: CPF,
      orderItems: [
        { idItem: 99, quantity: 1 }
      ],
      issueOrder: new Date()
    };
    await expect(async () => await placeOrder.execute(command))
      .rejects
      .toThrow(new Error('Product 99 invalid!'));
  })
})