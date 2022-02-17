import { Cupom } from "../../src/model/Cupom";
import { Customer } from "../../src/model/Customer";
import { Order } from "../../src/model/Order";
import { OrderProduct } from "../../src/model/OrderProduct";
import { Product } from "../../src/model/Product";


test('Should create a order with $300 when has 3 items for 100 each', () => {
  const customer = new Customer('606.077.054-18');
  const total = new Order([
    new OrderProduct(new Product('Item 1', 'Description 1', 50.0), 2),
    new OrderProduct(new Product('Item 2', 'Description 2', 100.0), 2)
  ], customer).getTotal();

  expect(total).toBe(300);
});

test('Should return $270 when apply cupom of 10% over $300', () => {
  const customer = new Customer('606.077.054-18');
  const total = new Order([
    new OrderProduct(new Product('Item 1', 'Description 1', 100.0), 2),
    new OrderProduct(new Product('Item 2', 'Description 2', 100.0), 1),
  ], customer).addCupom(Cupom.ofPercent(10))
    .getTotal();

  expect(total).toBe(270);
});