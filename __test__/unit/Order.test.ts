import { Coupon } from "../../src/domain/entity/Coupon";
import { OrderQuantityError, OrderDuplicateProductError, Order } from "../../src/domain/entity/Order";
import { Product } from "../../src/domain/entity/Product";
import { TechnicalDetails } from "../../src/domain/entity/TechnicalDetails";

const cpf = "397.974.888-02";
describe("Order.ts", () => {

  test('Should create a order with $300 when has 3 items for 100 each', () => {
    const order = new Order(cpf);
    order.addProduct(new Product('Item 1', 'Description 1', 50.0, undefined, 1), 2);
    order.addProduct(new Product('Item 2', 'Description 2', 100.00, undefined, 2), 2);
    const total = order.getTotal();

    expect(total).toBe(300);
  });

  test('Should return $270 when apply valid coupon of 10% over $300', () => {
    const issueOrder = new Date(2021, 1, 1, 1, 20, 0);
    const order = new Order(cpf, issueOrder);
    order.addProduct(new Product('Item 1', 'Description 1', 100.0, undefined, 1), 2);
    order.addProduct(new Product('Item 2', 'Description 2', 100.0, undefined, 2), 1);
    order.addCoupon(Coupon.ofPercent('C10', 10, new Date(2021, 1, 5, 1, 20, 0)));
    expect(order.getTotal()).toBe(270);
  });

  test('Should not apply coupon expired', () => {
    const issueOrder = new Date(2021, 2, 1, 1, 20, 0);
    const order = new Order(cpf, issueOrder);
    order.addProduct(new Product('Item 2', 'Description 2', 100.0), 1)
    order.addCoupon(Coupon.ofPercent('C10', 10, new Date(2021, 1, 20, 1, 20, 0)));
    expect(order.getTotal()).toBe(100);
  });

  test('Should calculate total with delivery equals 5715', () => {
    const order = new Order(cpf);
    order.addProduct(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10), 1), 1);
    order.addProduct(new Product('Item 2', '', 5000, new TechnicalDetails(20, 100, 50, 50), 2), 1);
    order.addProduct(new Product('Item 3', '', 30, new TechnicalDetails(1, 10, 10, 10), 3), 3);
    order.addCoupon(Coupon.ofPercent('C10', 10));
    expect(order.getTotal()).toBe(5715);
  })

  test('Should create order with code', () => {
    const issueOrder = new Date(2021, 2, 1, 1, 20, 0);
    const order = new Order(cpf, issueOrder, 2);
    order.addProduct(new Product('Item 2', 'Description 2', 100.0), 1)
    expect(order.getOrderCode()).toBe('202100000002');
  });

  test('Should not create order with negative quantity', () => {
    const issueOrder = new Date(2021, 2, 1, 1, 20, 0);
    const order = new Order(cpf, issueOrder, 2);
    expect(() => order.addProduct(new Product('Item 2', 'Description 2', 100.0), -1)).toThrow(OrderQuantityError);
  });

  test('Should not create order with duplicated product', () => {
    const issueOrder = new Date(2021, 2, 1, 1, 20, 0);
    const order = new Order(cpf, issueOrder, 2);
    const product = new Product('Item 2', 'Description 2', 100.0, undefined, 1);
    order.addProduct(product, 1);
    expect(() => order.addProduct(product, 2)).toThrow(OrderDuplicateProductError);
  });
  
});

