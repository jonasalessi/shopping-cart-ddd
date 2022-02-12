import { Cupom } from "./Cupom";
import { Customer } from "./Customer";
import { ProductPackage } from "./OrderProduct"; 

export class Order {
  private products: ProductPackage[];
  private cupom?: Cupom
  customer: Customer;

  constructor(products: Array<ProductPackage>, customer: Customer) {
    this.products = products;
    this.customer = customer;
  }

  getTotal(): number {
    const total = this.products.reduce((total, item) => total + item.getTotal(), 0);
    if (this.cupom) return this.cupom.applyValue(total);
    return total;
  }

  applyCupom(cupom: Cupom): Order{
    this.cupom = cupom;
    return this;
  }

}