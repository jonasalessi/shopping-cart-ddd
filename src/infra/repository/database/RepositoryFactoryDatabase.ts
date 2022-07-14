import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import Connection from "../../database/Connection";
import CouponRepositoryDatabase from "./CouponRepositoryDatabase";
import OrderRepositoryDatabase from "./OrderRepositoryDatabase";
import ProductRepositoryDatabase from "./ProductRepositoryDatabase";

export default class RepositoryFactoryDatabase implements RepositoryFactory {
  constructor(private readonly connection: Connection) {}

  createOrderRepository() {
    return new OrderRepositoryDatabase(this.connection);
  }

  createProductRepository() {
    return new ProductRepositoryDatabase(this.connection);
  }

  createCouponRepository() {
    return new CouponRepositoryDatabase(this.connection);
  }
}
