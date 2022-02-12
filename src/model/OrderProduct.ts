import { Product } from "./Product";

export class ProductPackage {
  private product: Product;
  private quantity: number

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }

  getTotal(): number {
    return this.product.value * this.quantity;
  }

}