import { Order } from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMem implements OrderRepository {

  private data: Order[] = [];

  async save(order: Order): Promise<void> {
    this.data.push(order);
    return Promise.resolve();
  }

  async nextSequence(): Promise<number> {
    return Promise.resolve(this.data.length + 1);
  }

  deleteAll(): Promise<void> {
    this.data = [];
    return Promise.resolve();
  }

  findByCode(code: string): Promise<Order | undefined> {
    return Promise.resolve(this.data.find(ord => ord.getOrderCode() === code));
  }
}