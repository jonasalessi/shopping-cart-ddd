import RepositoryFactory from "domain/factory/RepositoryFactory";
import CouponRepository from "domain/repository/CouponRepository";
import InvoiceRepository from "domain/repository/InvoiceRepository";
import OrderRepository from "domain/repository/OrderRepository";
import ProductRepository from "domain/repository/ProductRepository";
import CouponRepositoryMem from "./CouponRepositoryMem";
import OrderRepositoryMem from "./OrderRepositoryMem";
import ProductRepositoryMem from './ProductRepositoryMem';

export default class RepositoryFactoryMem implements RepositoryFactory {

  private orderRepository: OrderRepository;
  private productRepository: ProductRepository;
  private couponRepository: CouponRepository;

  constructor() {
    this.orderRepository = new OrderRepositoryMem();
    this.productRepository = new ProductRepositoryMem();
    this.couponRepository = new CouponRepositoryMem();
  }

  createOrderRepository(): OrderRepository {
    return this.orderRepository
  }

  createProductRepository(): ProductRepository {
    return this.productRepository;
  }

  createCouponRepository(): CouponRepository {
    return this.couponRepository;
  }

  createInvoiceRepository(): InvoiceRepository {
    throw new Error("Method not implemented.");
  }


}