import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import CouponRepository from "../../../domain/repository/CouponRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import ProductRepository from "../../../domain/repository/ProductRepository";
import CouponRepositoryMem from "./CouponRepositoryMem";
import OrderRepositoryMem from "./OrderRepositoryMem";
import ProductRepositoryMem from './ProductRepositoryMem';

export default class RepositoryFactoryMem implements RepositoryFactory {
  createOrderRepository(): OrderRepository {
    return new OrderRepositoryMem()
  }
  createProductRepository(): ProductRepository {
    return new ProductRepositoryMem();
  }
  createCouponRepository(): CouponRepository {
    return new CouponRepositoryMem();
  }

}