import PlaceOrder, { PlaceOrderCommand } from "application/usecase/PlaceOrder"
import { Coupon, CouponType } from "domain/entity/Coupon";
import { Product } from "domain/entity/Product";
import { TechnicalDetails } from "domain/entity/TechnicalDetails";
import { FAKE_CPF } from "../helpers/customer";
import BeanFactoryMem from "../BeanFactoryMem";
import { BeanFactory } from "domain/factory/BeanFactory";

describe("PlaceOrder.ts", () => {

  let beaFactory: BeanFactory;
  let products: Product[];

  beforeAll(async () => {
    beaFactory = new BeanFactoryMem(1);
    products = await loadProductsDummies();
  });

  afterAll(() => {
    beaFactory.repositories().createOrderRepository().deleteAll();
    beaFactory.repositories().createCouponRepository().deleteAll();
    beaFactory.repositories().createProductRepository()
      .deleteAllById(products.map(it => it.id));
  });

  const loadProductsDummies = async (): Promise<Product[]> => {
    const productRepository = beaFactory.repositories().createProductRepository();
    return [
      await productRepository.save(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10), 1)),
      await productRepository.save(new Product('Item 2', '', 5000, new TechnicalDetails(20, 100, 50, 50), 2)),
      await productRepository.save(new Product('Item 3', '', 30, new TechnicalDetails(1, 10, 10, 10), 3))
    ];
  }

  test('Should execute an order with total 4872', async () => {
    await beaFactory.repositories().createCouponRepository()
      .save(new Coupon("VALE20", 20, CouponType.PERCENTAGE));

    const placeOrder = new PlaceOrder(beaFactory);
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
    const newBeanFactory = new BeanFactoryMem(1);
    await newBeanFactory.repositories().createProductRepository()
      .save(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10), 1));

    const placeOrder = new PlaceOrder(newBeanFactory);
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
    const placeOrder = new PlaceOrder(beaFactory);
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