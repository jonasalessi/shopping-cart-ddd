import RepositoryFactory from "../../../domain/factory/RepositoryFactory";
import CouponRepository from "../../../domain/repository/CouponRepository";
import OrderRepository from "../../../domain/repository/OrderRepository";
import ProductRepository from "../../../domain/repository/ProductRepository";
import CouponRepositoryMem from "./CouponRepositoryMem";
import OrderRepositoryMem from "./OrderRepositoryMem";
import ProductRepositoryMem from './ProductRepositoryMem';

export default class RepositoryFactoryMem implements RepositoryFactory {
  private static orderInstance: OrderRepository;
  private static productRepository: ProductRepository;
  private static couponRepository: CouponRepository;

  createOrderRepository(): OrderRepository {
    if (!RepositoryFactoryMem.orderInstance) {
      RepositoryFactoryMem.orderInstance = new OrderRepositoryMem()
    }
    return RepositoryFactoryMem.orderInstance
  }
  
  createProductRepository(): ProductRepository {
    if (!RepositoryFactoryMem.productRepository) {
      RepositoryFactoryMem.productRepository = new ProductRepositoryMem();
    }
    return RepositoryFactoryMem.productRepository;
  }

  createCouponRepository(): CouponRepository {
    if (!RepositoryFactoryMem.couponRepository) {
      RepositoryFactoryMem.couponRepository = new CouponRepositoryMem();
    }
    return RepositoryFactoryMem.couponRepository;
  }

}