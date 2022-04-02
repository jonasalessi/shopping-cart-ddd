import { Customer } from "../../domain/entity/Customer";
import { Order } from "../../domain/entity/Order";
import { OrderProduct } from "../../domain/entity/OrderProduct";
import CouponRepository from "../../domain/repository/CouponRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import ProductRepository from "../../domain/repository/ProductRepository";

export default class PlaceOrder {
  constructor(
    readonly productRepository: ProductRepository,
    readonly orderRepository: OrderRepository,
    readonly couponRepository: CouponRepository
  ) { }

  async execute(command: PlaceOrderCommand): Promise<PlaceOrderOutput> {
    const order = await this.createOrder(command);
    if (command.coupon) {
      const coupon = await this.couponRepository.findByCode(command.coupon);
      if (coupon) {
        order.addCoupon(coupon);
      }
    }
    const output = { code: order.code.value, total: order.getTotal() };
    await this.orderRepository.save(order);
    return Promise.resolve(output);
  }


  private async createOrder(command: PlaceOrderCommand) {
    const products = await this.productRepository.findProductByIds(command.orderItems.map(item => item.idItem));
    const productsQuantity = command.orderItems.map(item => {
      const product = products.find(prod => item.idItem === prod.id);
     if (!product) throw new Error(`Product ${item.idItem} invalid!`);
      return { product, quantity: item.quantity };
    })
    const sequence = await this.orderRepository.nextSequence();
    const order = new Order(new Customer(command.cpf), command.issueOrder, sequence);
    productsQuantity.forEach(item => {
      order.addProduct(item.product, item.quantity);
    });
    return order;
  }
}

export type PlaceOrderCommand = {
  cpf: string;
  orderItems: {
    idItem: number;
    quantity: number;
  }[];
  coupon?: string;
  issueOrder: Date
}

export type PlaceOrderOutput = {
  code: string;
  total: number;
}