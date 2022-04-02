import { Product } from "../entity/Product";

export default interface ProductRepository {
  saveAll(products: Product[]): Promise<Product[]>;

  findProductByIds(ids: number[]): Promise<Product[]>;

  save(product: Product): Promise<Product>
}