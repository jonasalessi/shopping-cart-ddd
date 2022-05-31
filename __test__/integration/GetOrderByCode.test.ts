import GetOrderByCode from "../../src/application/usecase/GetOrderByCode";
import PlaceOrder, { PlaceOrderCommand } from "../../src/application/usecase/PlaceOrder";
import { Order } from "../../src/domain/entity/Order";
import { Product } from "../../src/domain/entity/Product";
import { TechnicalDetails } from "../../src/domain/entity/TechnicalDetails";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import RepositoryFactoryDatabase from "../../src/infra/repository/database/RepositoryFactoryDatabase";

describe('GetOrderByCode.ts', () => {
  let repositoryFactory: RepositoryFactory;

  beforeAll(async () => {
    repositoryFactory = new RepositoryFactoryDatabase();
  });

  const loadOrder = async () => {
    await repositoryFactory.createProductRepository().save(new Product('Item 1', '', 1000, new TechnicalDetails(3, 100, 30, 10), 1));
    const placeOrder = new PlaceOrder(repositoryFactory);
    const command: PlaceOrderCommand = {
      cpf: '935.411.347-80',
      orderItems: [
        { idItem: 1, quantity: 1 }
      ],
      issueOrder: new Date('2021-01-01T10:00:00')
    };
    await placeOrder.execute(command);
    await placeOrder.execute(command);
  }

  test('Should returns a order by code 202100000002', async () => {
    await loadOrder();
    const getOrderByCode = new GetOrderByCode(repositoryFactory);
    const order: Order = await getOrderByCode.execute('202100000002');
    expect(order.getOrderCode()).toBe('202100000002');
  });

});