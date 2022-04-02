import { Product } from "../entity/Product";

export default interface ProductRepository {

  findProductByIds(ids: number[]): Promise<Product[]>;

  save(product: Product): Promise<Product>
}