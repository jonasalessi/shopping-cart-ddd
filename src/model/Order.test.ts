import { Cupom } from "./Cupom";
import { Product } from "./Product";
import { Order } from "./Order";
import { ProductPackage } from "./OrderProduct";
import { Customer } from "./Customer";
import { CPF } from "./CPF";

test('Should create a order with $300 when has 3 items for 100 each', () => {
  const customer = new Customer(new CPF('606.077.054-18'));
  const total = new Order([
    new ProductPackage(new Product('Item 1', 'Description 1', 50.0), 2),
    new ProductPackage(new Product('Item 2', 'Description 2', 100.0), 2)
  ], customer).getTotal();

  expect(total).toBe(300);
});

test('Should return $270 when apply cupom of 10% over $300', () => {
  const customer = new Customer(new CPF('606.077.054-18'));
  const total = new Order([
    new ProductPackage(new Product('Item 1', 'Description 1', 100.0), 2),
    new ProductPackage(new Product('Item 2', 'Description 2', 100.0), 1),
  ], customer).applyCupom(Cupom.ofPercent(10))
    .getTotal();

  expect(total).toBe(270);
});