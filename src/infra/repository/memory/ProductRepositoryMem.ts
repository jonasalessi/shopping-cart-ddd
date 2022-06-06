import { Product } from "../../../domain/entity/Product";
import ProductRepository from "../../../domain/repository/ProductRepository";

export default class ProductRepositoryMem implements ProductRepository {

  private data: Product[] = [];

  findProductByIds(ids: number[]): Promise<Product[]> {
    return Promise.resolve(this.data.filter(it => ids.includes(it.id)))
  }

  async saveAll(products: Product[]): Promise<void> {
     await Promise.all(products.map(this.save.bind(this)))
  }

  async save(product: Product): Promise<number> { 
    this.data.push(product);
    return product.id;
  }

  deleteAll(): Promise<void> {
    this.data = [];
    return Promise.resolve();
  }
}