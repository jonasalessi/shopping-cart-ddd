import { Product } from "../../src/domain/entity/Product";
import ProductRepository from "../../src/domain/repository/ProductRepository";

export default class ProductRepositoryMem implements ProductRepository {
  
  private readonly data: Product[] = [];

  findProductByIds(ids: number[]): Promise<Product[]> {
    return Promise.resolve(this.data.filter(it => ids.indexOf(it.id) > -1))
  }

  async saveAll(products: Product[]): Promise<Product[]> {
    const prods = await Promise.all(products.map(this.save.bind(this)))
    return Promise.resolve(prods)
  }

  async save(product: Product): Promise<Product> {
    this.data.push(product);
    return Promise.resolve(product);
  }
}