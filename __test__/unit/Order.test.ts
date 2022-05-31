import { Coupon } from "../../src/domain/entity/Coupon";
import { Order } from "../../src/domain/entity/Order";
import { OrderProduct } from "../../src/domain/entity/OrderProduct";
import { Product } from "../../src/domain/entity/Product";
import { TechnicalDetails } from "../../src/domain/entity/TechnicalDetails";

describe("Order.ts", () => {
  const cpf = "397.974.888-02";
  const coupons = [
    Coupon.ofPercent('C10', 10, new Date(2021, 1, 5, 1, 20, 0)),
    Coupon.ofPercent('CC10', 10, new Date(2021, 1, 10, 0, 20, 0)),
    Coupon.ofPercent('CCC10', 10, new Date(2021, 1, 6, 1, 20, 0))
  ]

  test('Should create a order with $300 when has 3 items for 100 each', () => {
    const order = new Order(cpf);
    order.addProduct(new Product('Item 1', 'Description 1', 50.0), 2)
    order.addProduct(new Product('Item 2', 'Description 2', 100.00), 2)
    const total = order.getTotal();

    expect(total).toBe(300);
  });

  it.each(coupons)('Should return $270 when apply valid coupon of 10% over $300', (coupon) => {
    const issueOrder = new Date(2021, 1, 1, 1, 20, 0);
    const order = new Order(cpf, issueOrder);
    order.addProduct(new Product('Item 1', 'Description 1', 100.0), 2);
    order.addProduct(new Product('Item 2', 'Description 2', 100.0), 1)
    order.addCoupon(coupon);
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
    order.addProduct(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10)), 1);
    order.addProduct(new Product('Item 2', '', 5000, new TechnicalDetails(20, 100, 50, 50)), 1);
    order.addProduct(new Product('Item 3', '', 30, new TechnicalDetails(1, 10, 10, 10)), 3);
    order.addCoupon(Coupon.ofPercent('C10', 10));
    expect(order.getTotal()).toBe(5715);
  })

  test('Should create order with code', () => {
    const issueOrder = new Date(2021, 2, 1, 1, 20, 0);
    const order = new Order(cpf, issueOrder, 2);
    order.addProduct(new Product('Item 2', 'Description 2', 100.0), 1)
    expect(order.getOrderCode()).toBe('202100000002');
  });
});

