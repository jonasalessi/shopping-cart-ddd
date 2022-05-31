import { Product } from "../entity/Product";

export default interface ProductRepository {
  saveAll(products: Product[]): Promise<void>;
  findProductByIds(ids: number[]): Promise<Product[]>;
  save(product: Product): Promise<void>;
  deleteAll(): Promise<void>;
}