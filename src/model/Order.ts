import { Cupom } from "./Cupom";
import { Customer } from "./Customer";
import { OrderProduct } from "./OrderProduct"; 

export class Order { 
  private cupom?: Cupom
 
  constructor(readonly products: Array<OrderProduct>, readonly customer: Customer) { 
  }

  getTotal(): number {
    const total = this.products.reduce((total, item) => total + item.getTotal(), 0);
    if (this.cupom) return this.cupom.applyValue(total);
    return total;
  }

  addCupom(cupom: Cupom): Order{
    this.cupom = cupom;
    return this;
  }

}