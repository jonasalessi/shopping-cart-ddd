import { SimulateFreight } from "application/usecase/SimulateFreight";
import ProductRepository from "domain/repository/ProductRepository";
import ProductRepositoryMem from "infra/repository/memory/ProductRepositoryMem";
import { loadProductsDummies } from "../helpers/product";

describe("SimulateFreight", () => {
  let productRepository: ProductRepository;

  beforeEach(async () => {
    productRepository = new ProductRepositoryMem();
  });


  test("Should simulate freight of 3 products with totals of 439.90", async () => {
    await productRepository.saveAll(loadProductsDummies());
    const command = { items: [{ id: 1, quantity: 1 }, { id: 2, quantity: 1 }, { id: 3, quantity: 1 }] };
    const value = await new SimulateFreight(productRepository).execute(command);
    expect(value).toBe(439);
  })

})