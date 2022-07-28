import { Product } from "domain/entity/Product";
import ProductRepository from "domain/repository/ProductRepository";

export default class ProductRepositoryMem implements ProductRepository {

  private data: Product[] = [];

  findProductByIds(ids: number[]): Promise<Product[]> {
    return Promise.resolve(this.data.filter(it => ids.includes(it.id)))
  }

  async saveAll(products: Product[]): Promise<Product[]> {
    return await Promise.all(products.map(it => this.save(it)))
  }

  async save(product: Product): Promise<Product> {
    this.data.push(product);
    return product;
  }

  deleteAllById(ids: number[]): Promise<void> {
    this.data = this.data.filter(it => ids.indexOf(it.id) === -1)
    return Promise.resolve();
  }
}