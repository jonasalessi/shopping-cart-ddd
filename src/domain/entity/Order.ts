import {Coupon} from "./Coupon";
import {Customer} from "./Customer";
import {Freight} from "./Freight";
import OrderCode from "./OrderCode";
import {OrderProduct} from "./OrderProduct";
import { Product } from "./Product";

export class Order {
 
    private coupon?: Coupon
    private readonly _code: OrderCode;
    private readonly freight: Freight
    private readonly products: Array<OrderProduct> = []

    constructor(
        readonly customer: Customer,
        readonly issueOrder: Date = new Date(),
        readonly sequence: number = 1
    ) {
        this.freight = new Freight()
        this._code = new OrderCode(issueOrder, sequence)
    }

    get code(): OrderCode {
        return this._code
    }

    addProduct(product: Product, quantity: number) {
        const orderProduct = new OrderProduct(product, quantity)
        this.products.push(orderProduct);
        this.freight.addProduct(orderProduct)
    }

    getTotal(): number {
        const total = this.products.reduce((total, item) => total + item.getTotal(), 0);
        const totalWithDelivery = total + this.freight.getTotal();
        if (this.coupon) return this.coupon.applyValue(totalWithDelivery);
        return totalWithDelivery;
    }

    addCoupon(coupon: Coupon): void {
        if (coupon.isExpired(this.issueOrder)) {
            return;
        }
        this.coupon = coupon;
    }

}