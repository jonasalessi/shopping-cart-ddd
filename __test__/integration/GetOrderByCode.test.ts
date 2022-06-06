import GetOrderByCode from "../../src/application/usecase/GetOrderByCode";
import RepositoryFactory from "../../src/domain/factory/RepositoryFactory";
import RepositoryFactoryDatabase from "../../src/infra/repository/database/RepositoryFactoryDatabase";

describe('GetOrderByCode.ts', () => { 
  let repositoryFactory: RepositoryFactory;
  let getOrderByCode: GetOrderByCode;

  beforeAll(async () => {
    repositoryFactory = new RepositoryFactoryDatabase(); 
    getOrderByCode = new GetOrderByCode(repositoryFactory);
  }); 

   // Analize the possibility to load the data from sql file
  test('Should returns a order by code 202200000002', async () => {
    const order = await getOrderByCode.execute('202200000002');
    expect(order?.getOrderCode()).toBe('202200000002');
  });
 
});