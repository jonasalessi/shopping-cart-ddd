import { Coupon } from "../../src/domain/entity/Coupon";
import { Customer } from "../../src/domain/entity/Customer";
import { Order } from "../../src/domain/entity/Order";
import { OrderProduct } from "../../src/domain/entity/OrderProduct";
import { Product } from "../../src/domain/entity/Product";
import { TechnicalDetails } from "../../src/domain/entity/TechnicalDetails";

describe("Order.ts", () => {
  let customer: Customer;
  const coupons = [
    Coupon.ofPercent(10, new Date(2021, 1, 5, 1, 20, 0)),
    Coupon.ofPercent(10, new Date(2021, 1, 10, 0, 20, 0)),
    Coupon.ofPercent(10, new Date(2021, 1, 6, 1, 20, 0))
  ]

  test('Should create a order with $300 when has 3 items for 100 each', () => {
    const total = new Order([
      new OrderProduct(new Product('Item 1', 'Description 1', 50.0), 2),
      new OrderProduct(new Product('Item 2', 'Description 2', 100.00), 2)
    ], customer).getTotal();

    expect(total).toBe(300);
  });

  it.each(coupons)('Should return $270 when apply valid coupon of 10% over $300', (coupon) => {
    const issueOrder = new Date(2021, 1, 1, 1, 20, 0);
    const order = new Order([
      new OrderProduct(new Product('Item 1', 'Description 1', 100.0), 2),
      new OrderProduct(new Product('Item 2', 'Description 2', 100.0), 1),
    ], customer, issueOrder);
    order.addCoupon(coupon);
    expect(order.getTotal()).toBe(270);
  });

  test('Should not apply coupon expired', () => {
    const issueOrder = new Date(2021, 2, 1, 1, 20, 0);
    const order = new Order([new OrderProduct(new Product('Item 2', 'Description 2', 100.0), 1)], customer, issueOrder);
    order.addCoupon(Coupon.ofPercent(10, new Date(2021, 1, 20, 1, 20, 0)));
    expect(order.getTotal()).toBe(100);
  });

  test('Should calculate total with delivery equals 5715', () => {
    const items = [
      new OrderProduct(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10)), 1),
      new OrderProduct(new Product('Item 2', '', 5000, new TechnicalDetails(20, 100, 50, 50)), 1),
      new OrderProduct(new Product('Item 3', '', 30, new TechnicalDetails(1, 10, 10, 10)), 3)
    ];
    const order = new Order(items, customer);
    order.addCoupon(Coupon.ofPercent(10));
    expect(order.getTotal()).toBe(5715);
  })
});

