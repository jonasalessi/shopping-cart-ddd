import { Product } from "./Product";

export class OrderProduct {

  constructor(readonly product: Product, readonly quantity: number) {}

  getTotal(): number {
    return this.product.value * this.quantity;
  }

}