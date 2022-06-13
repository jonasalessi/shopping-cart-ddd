import { Coupon, CouponType } from "../../../domain/entity/Coupon";
import { Order } from "../../../domain/entity/Order";
import { Product } from "../../../domain/entity/Product";
import { TechnicalDetails } from "../../../domain/entity/TechnicalDetails";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) {}

  async findByCode(code: string): Promise<Order | undefined> {
    try {
      const [orderData] = await this.connection.query("select * from p_order where code = $1", [code]);
      if (!orderData) throw new Error("Order not found");
      const order = new Order(orderData.cpf, new Date(orderData.issue_date), orderData.sequence);
      const orderProducts = await this.connection.query("select * from order_product where id_order = $1", [
        orderData.id_order,
      ]);
      for (const orderProduct of orderProducts) {
        const [data] = await this.connection.query("select * from product where id_product = $1", [
          orderProduct.id_product,
        ]);
        const tech = new TechnicalDetails(data.weight, data.height, data.width, data.length);
        const prod = new Product(data.name, data.description, data.price, tech, data.id);
        order.addProduct(prod, orderProduct.quantity);
      }
      if (orderData.coupon) {
        const [couponData] = await this.connection.query("select * from coupon where code = $1", [orderData.coupon]);
        const coupon = new Coupon(
          couponData.code,
          parseFloat(couponData.percentage),
          CouponType.PERCENTAGE,
          new Date(couponData.expire_date)
        );
        order.addCoupon(coupon);
      }
      return order;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async save(order: Order): Promise<void> {
    const [orderData] = await this.connection.query(
      `
    insert into p_order (code, cpf, issue_date, coupon, freight, sequence, total) values ($1, $2, $3, $4, $5, $6, $7) returning *
    `,
      [
        order.getOrderCode(),
        order.getCpf(),
        order.issueOrder,
        order.getCouponCode(),
        order.getFreightTotal(),
        order.sequence,
        order.getTotal(),
      ]
    );
    for (const orderItem of order.getProducts()) {
      await this.connection.query(
        "insert into order_product (id_order, id_item, price, quantity) values ($1, $2, $3, $4)",
        [orderData.id_order, orderItem.product.id, orderItem.product.value, orderItem.quantity]
      );
    }
  }

  async nextSequence(): Promise<number> {
    throw new Error("Method not implemented.");
  }

  async deleteAll(): Promise<void> {
    await this.connection.query("delete from order_product");
    await this.connection.query("delete from p_order");
  }
}
