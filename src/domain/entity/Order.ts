import {Coupon} from "./Coupon";
import {Customer} from "./Customer";
import {Freight} from "./Freight";
import {OrderProduct} from "./OrderProduct";

export class Order {
    private coupon?: Coupon
    private readonly freight: Freight

    constructor(
        readonly products: Array<OrderProduct>,
        readonly customer: Customer,
        readonly issueOrder: Date = new Date()
    ) {
        this.freight = new Freight(products)
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