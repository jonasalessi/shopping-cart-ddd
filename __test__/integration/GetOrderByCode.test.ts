import GetOrderByCode from "application/usecase/GetOrderByCode";
import { Order } from "domain/entity/Order";
import RepositoryFactory from "domain/factory/RepositoryFactory";
import RepositoryFactoryMem from "infra/repository/memory/RepositoryFactoryMem";

describe('GetOrderByCode.ts', () => {
  let repositoryFactory: RepositoryFactory;
  let getOrderByCode: GetOrderByCode;

  beforeAll(async () => {
    repositoryFactory = new RepositoryFactoryMem();
    getOrderByCode = new GetOrderByCode(repositoryFactory);
  });

  const createOrder = () => {
    const order = new Order('397.974.888-02', new Date(2022, 1, 1, 1, 20, 0), 2);
    repositoryFactory.createOrderRepository().save(order);
  }

  test('Should returns a order by code 202200000002', async () => {
    createOrder();
    const order = await getOrderByCode.execute('202200000002');
    expect(order?.getOrderCode()).toBe('202200000002');
  });

});