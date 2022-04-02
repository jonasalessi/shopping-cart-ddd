import { Order } from "../../src/domain/entity/Order";
import OrderRepository from "../../src/domain/repository/OrderRepository";

export default class OrderRepositoryMem implements OrderRepository {
  
  private readonly data: Order[] = [];

  async save(order: Order): Promise<void> {
    this.data.push(order);
    return Promise.resolve();
  }

  async nextSequence(): Promise<number> {
    return Promise.resolve(this.data.length + 1);
  }
}