import { SimulateFreight } from "../../src/application/usecase/SimulateFreight";
import { Product } from "../../src/domain/entity/Product";
import { TechnicalDetails } from "../../src/domain/entity/TechnicalDetails";
import ProductRepository from "../../src/domain/repository/ProductRepository";
import ProductRepositoryMem from "../repository/ProductRepositoryMem";

describe("SimulateFreight", () => {
  let productRepository: ProductRepository;
  
  beforeEach(async () => {
    productRepository = new ProductRepositoryMem();
  });

  const loadProductsDummies = async () => {
    const camera = new Product('Camera', '', 0, new TechnicalDetails(0.9, 10, 10, 10), 1);
    const guitar = new Product('Guitar', '', 0, new TechnicalDetails(3, 100, 30, 10), 2);
    const freezer = new Product('Freezer', '', 0, new TechnicalDetails(40, 200, 100, 50), 3);
    await productRepository.saveAll([camera, guitar, freezer]);
  }


test("Should simulate freight of 3 products with totals of 439.90", async () => {
    await loadProductsDummies();
    const command = {items: [{id: 1, quantity: 1},{id: 2, quantity: 1},{id: 3, quantity: 1}]};
    const value = await new SimulateFreight(productRepository).execute(command);
    expect(value).toBe(439);
})

})