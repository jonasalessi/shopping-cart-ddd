import { Product } from "domain/entity/Product";
import ProductRepository from "domain/repository/ProductRepository";

export default class ProductRepositoryMem implements ProductRepository {

  private data: Product[] = [];

  async findProductByIds(ids: number[]): Promise<Product[]> {
    return this.data.filter(it => ids.includes(it.id))
  }

  async saveAll(products: Product[]): Promise<Product[]> {
    return await Promise.all(products.map(it => this.save(it)))
  }

  async save(product: Product): Promise<Product> {
    const id = this.data.length + 1;
    const productCopy = new Product(
      product.name,
      product.description,
      product.value,
      product.technicalDetails,
      id
    );
    this.data.push(productCopy);
    return productCopy;
  }

  async deleteAllById(ids: number[]): Promise<void> {
    this.data = this.data.filter(it => ids.indexOf(it.id) === -1)
  }
}