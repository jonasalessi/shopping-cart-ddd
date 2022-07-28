import { Order } from "../entity/Order";

export default interface OrderRepository {

  findByCode(code: string): Promise<Order | undefined>;
  save(order: Order): Promise<void>;
  deleteAll(): Promise<void>;
}