import { OrderProduct } from "./OrderProduct";

const DISTANCE_KM = 1000;
const METER_FACTOR = 100;

export class Freight {

  constructor(readonly products: Array<OrderProduct>) { }

  private calculateBy(orderProduct: OrderProduct): number {
    const volume = orderProduct.product.getVolume();
    const density = orderProduct.product.getDensity();
    if (volume == 0 && density == 0) {
      return 0;
    }
    return (volume * DISTANCE_KM * (density / METER_FACTOR)) * orderProduct.quantity;
  }

  getTotal(): number {
    const total = this.products
      .reduce((acc, orderProduct) => acc + this.calculateBy(orderProduct), 0);
    if (total > 0 && total < 10) {
      return 10;
    }
    return total;
  }
}