import { Freight } from "domain/entity/Freight"
import { OrderProduct } from "domain/entity/OrderProduct"
import { Product } from "domain/entity/Product"
import { TechnicalDetails } from "domain/entity/TechnicalDetails"

describe('Delivery.ts', () => {

  test('Should calculate minimal value equals 10.00', () => {
    const product = new Product('Camera', '', 1000, new TechnicalDetails(0.9, 10, 10, 10));
    const delivery = new Freight();
    delivery.addProduct(new OrderProduct(product, 1));
    const value = delivery.getTotal();
    expect(value).toBe(10);
  })

  test('Should calculate the delivery for 3 products with totals of 439.90', () => {
    const camera = new Product('Camera', '', 0, new TechnicalDetails(0.9, 10, 10, 10));
    const guitar = new Product('Guitar', '', 0, new TechnicalDetails(3, 100, 30, 10));
    const freezer = new Product('Freezer', '', 0, new TechnicalDetails(40, 200, 100, 50));
    const delivery = new Freight();
    delivery.addProduct(new OrderProduct(camera, 1));
    delivery.addProduct(new OrderProduct(guitar, 1));
    delivery.addProduct(new OrderProduct(freezer, 1));
    const value = delivery.getTotal();
    expect(value).toBe(439);
  })
})