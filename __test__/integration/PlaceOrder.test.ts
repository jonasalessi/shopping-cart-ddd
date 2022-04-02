import PlaceOrder, { PlaceOrderCommand } from "../../src/application/usecase/PlaceOrder"
import { Coupon, CouponType } from "../../src/domain/entity/Coupon";
import { Product } from "../../src/domain/entity/Product";
import { TechnicalDetails } from "../../src/domain/entity/TechnicalDetails";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import OrderRepository from "../../src/domain/repository/OrderRepository";
import ProductRepository from "../../src/domain/repository/ProductRepository";
import CouponRepositoryMem from "../repository/CouponRepositoryMem";
import OrderRepositoryMem from "../repository/OrderRepositoryMem";
import ProductRepositoryMem from "../repository/ProductRepositoryMem";

describe("PlaceOrder.ts", () => {
  let productRepository: ProductRepository;
  let orderRepository: OrderRepository;
  let couponRepository: CouponRepository;
  const CPF = '935.411.347-80';

  beforeEach(async () => {
    productRepository = new ProductRepositoryMem();
    orderRepository = new OrderRepositoryMem();
    couponRepository = new CouponRepositoryMem();
  });

  const loadProductsDummies = async () => {
    await productRepository.save(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10), 1));
    await productRepository.save(new Product('Item 2', '', 5000, new TechnicalDetails(20, 100, 50, 50), 2));
    await productRepository.save(new Product('Item 3', '', 30, new TechnicalDetails(1, 10, 10, 10), 3));
  }

  test('Should execute an order with total 4872', async () => {
    await couponRepository.save(new Coupon("VALE20", 20, CouponType.PERCENTAGE));
    await loadProductsDummies();
    const placeOrder = new PlaceOrder(productRepository, orderRepository, couponRepository);
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
    const placeOrder = new PlaceOrder(productRepository, orderRepository, couponRepository);
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
    const placeOrder = new PlaceOrder(productRepository, orderRepository, couponRepository);
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