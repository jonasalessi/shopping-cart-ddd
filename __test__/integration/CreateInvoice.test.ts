import PlacedOrder from "domain/event/PlacedOrder";
import { Order } from "domain/entity/Order";
import { Product } from "domain/entity/Product";
import PostgreSqlConnectionAdapter from "infra/database/PostgreSqlConnectionAdapter";
import RepositoryFactoryDatabase from "infra/repository/database/RepositoryFactoryDatabase";
import { FAKE_CPF } from "../helpers/customer";
import { createProduct } from "../helpers/product";
import { CreateInvoice } from "application/handler/CreateInvoice";

describe('CreateInvoice.ts', () => {
  const repositoryFactory = new RepositoryFactoryDatabase(new PostgreSqlConnectionAdapter());
  const invoiceRepository = repositoryFactory.createInvoiceRepository();
  const productRepository = repositoryFactory.createProductRepository();

  const loadProductsDummies = async (): Promise<Product[]> => {
    return await productRepository.saveAll([
      createProduct({ name: 'Item 1' }),
      createProduct({ name: 'Item 2' })
    ]);
  }

  test('Should create new entry decrementing the product stock', async () => {
    const products = await loadProductsDummies();
    const createInvoice = new CreateInvoice(repositoryFactory);
    const issueOrder = new Date(2021, 1, 1, 1, 20, 0);
    const order = new Order(FAKE_CPF, issueOrder);
    products.forEach(it => order.addProduct(it, 1));
    createInvoice.handle(new PlacedOrder(order));
    const invoices = await invoiceRepository.findAllByCpf(FAKE_CPF);
    expect(invoices).toHaveLength(1);
    productRepository.deleteAllById(products.map(it => it.id));
  });
})