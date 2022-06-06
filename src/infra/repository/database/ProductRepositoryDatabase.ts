import { Product } from "../../../domain/entity/Product";
import { TechnicalDetails } from "../../../domain/entity/TechnicalDetails";
import ProductRepository from "../../../domain/repository/ProductRepository";
import Connection from "../../database/Connection";


export default class ProductRepositoryData implements ProductRepository {

  constructor(private readonly connection: Connection) { }

  async saveAll(products: Product[]): Promise<void> {
    await Promise.all(products.map(product => this.save(product)));
  }

  async findProductByIds(ids: number[]): Promise<Product[]> {
    const result = await this.connection.query("select * from product where id in ($1)", [ids.join(',')]);
    return result.map((prod: any) =>
      new Product(prod.name, prod.description, prod.price,
        new TechnicalDetails(prod.weight, prod.height, prod.width, prod.length)));
  }

  async save(product: Product): Promise<number> {
    const tec = product.technicalDetails;
    const [{id}] = await this.connection.query(`
    insert into product (name, description, price, width, height, length, weight) 
    values ($1, $2, $3, $4, $5, $6, $7) returning id
    `, [product.name, product.description, product.value, tec?.widthCm, tec?.heightCm,
    tec?.lengthCm, tec?.weightKg]);
    return id;
  }

  async deleteAll(): Promise<void> {
    await this.connection.query("delete from product")
  }

}