import { Coupon } from "./Coupon";
import { Cpf } from "./CPF";
import { Freight } from "./Freight";
import OrderCode from "./OrderCode";
import { OrderProduct } from "./OrderProduct";
import { Product } from "./Product";

export class Order {

    private coupon?: Coupon
    private readonly code: OrderCode;
    private readonly freight: Freight
    private readonly products: Array<OrderProduct> = []
    private readonly cpf: Cpf;

    constructor(
        cpf: string,
        readonly issueOrder: Date = new Date(),
        readonly sequence: number = 1
    ) {
        this.cpf = new Cpf(cpf);
        this.freight = new Freight()
        this.code = new OrderCode(issueOrder, sequence)
    }

    getProducts(): Array<OrderProduct> {
        return [...this.products]
    }

    getFreightTotal(): number {
        return this.freight.getTotal()
    }

    getCouponCode(): string | undefined {
        return this.coupon?.code;
    }

    getCpf(): string {
        return this.cpf.getValue();
    }

    getOrderCode(): string {
        return this.code.value
    }

    addProduct(product: Product, quantity: number) {
        if (quantity <= 0) {
            throw new OrderQuantityNegativeError();
        }
        if (this.products.find(p => p.product.id === product.id)) {
            throw new OrderDuplicateProductError(product.name);
        }
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
        if (coupon.isExpired(this.issueOrder)) return;
        this.coupon = coupon;
    }

}

export class OrderQuantityNegativeError extends Error {
    constructor() {
        super("Negative or 0 quantity is not allowed!")
    }
}

export class OrderDuplicateProductError extends Error {
    constructor(productName: string) {
        super(`${productName} was already in the basket!`)
    }
}