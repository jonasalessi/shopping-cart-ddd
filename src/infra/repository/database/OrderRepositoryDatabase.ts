import { Order } from "domain/entity/Order";
import OrderRepository from "domain/repository/OrderRepository";
import Connection from "infra/database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {
  constructor(readonly connection: Connection) { }

  async findByCode(code: string): Promise<Order | undefined> {
    throw new Error('Method not implemented.');
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


  async deleteAll(): Promise<void> {
    await this.connection.query("delete from order_product");
    await this.connection.query("delete from p_order");
  }
}
