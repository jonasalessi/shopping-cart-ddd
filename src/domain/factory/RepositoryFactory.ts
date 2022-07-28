import CouponRepository from "domain/repository/CouponRepository";
import InvoiceRepository from "domain/repository/InvoiceRepository";
import OrderRepository from "domain/repository/OrderRepository";
import ProductRepository from "domain/repository/ProductRepository";

export default interface RepositoryFactory {

    createInvoiceRepository(): InvoiceRepository;
    createOrderRepository(): OrderRepository;
    createProductRepository(): ProductRepository;
    createCouponRepository(): CouponRepository;
}