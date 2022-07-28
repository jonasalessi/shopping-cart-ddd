import RepositoryFactory from "domain/factory/RepositoryFactory";
import CouponRepository from "domain/repository/CouponRepository";
import InvoiceRepository from "domain/repository/InvoiceRepository";
import OrderRepository from "domain/repository/OrderRepository";
import ProductRepository from "domain/repository/ProductRepository";
import Connection from "infra/database/Connection";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import InvoiceRepositoryDatabase from "./InvoiceRepositoryDatabase";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(private readonly connection: Connection) { }

  createInvoiceRepository(): InvoiceRepository {
    return new InvoiceRepositoryDatabase(this.connection);
  }

  createOrderRepository(): OrderRepository {
    return new OrderRepositoryDatabase(this.connection);
  }
  createProductRepository(): ProductRepository {
    return new ProductRepositoryDatabase(this.connection);
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryDatabase(this.connection);
  }
}
