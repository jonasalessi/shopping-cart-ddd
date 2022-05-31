import { Freight } from "../../domain/entity/Freight";
import { Product } from "../../domain/entity/Product";
import { OrderProduct } from "../../domain/entity/OrderProduct";
import ProductRepository from "../../domain/repository/ProductRepository";

export class SimulateFreight {

  constructor(readonly productRepository: ProductRepository) { }

  async execute(command: SimulateFreightCommand): Promise<number> {
    const products = await this.getOrderProductsBy(command.items)
    const freight = new Freight()
    products.forEach(it => freight.addProduct(it))
    return freight.getTotal();
  }

  createOrderBy = (items: Item[]) => (product: Product) => {
    const item = items.find(it => it.id === product.id);
    if (!item) throw new Error(`Product ${product.id} invalid!`);
    return new OrderProduct(product, item.quantity);
  }

  private async getOrderProductsBy(items: Item[]) {
    const ids = items.map(item => item.id);
    return (await this.productRepository.findProductByIds(ids))
      .map(this.createOrderBy(items));
  }
}

type Item = { id: number, quantity: number };

export type SimulateFreightCommand = {
  items: Item[];
}