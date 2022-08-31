import { Order } from "domain/entity/Order";
import OrderRepository from "domain/repository/OrderRepository";

export default class OrderRepositoryMem implements OrderRepository {
  private data: Order[] = [];

  async save(order: Order): Promise<void> {
    this.data.push(order);
  }

  async nextSequence(): Promise<number> {
    return this.data.length + 1;
  }

  async deleteAll(): Promise<void> {
    this.data = [];
  }

  async findByCode(code: string): Promise<Order | undefined> {
    return this.data.find((ord) => ord.getOrderCode() === code);
  }
}
