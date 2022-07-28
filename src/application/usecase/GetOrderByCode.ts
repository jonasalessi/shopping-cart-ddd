import RepositoryFactory from 'domain/factory/RepositoryFactory';
import OrderRepository from 'domain/repository/OrderRepository';
import { Order } from 'domain/entity/Order';

export default class GetOrderByCode {
  private readonly orderRepository: OrderRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.orderRepository = repositoryFactory.createOrderRepository();
  }

  async execute(code: string): Promise<Order | undefined> {
    return await this.orderRepository.findByCode(code);
  }


}