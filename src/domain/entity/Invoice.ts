import { OrderProduct } from "./OrderProduct";

export default class Invoice {

  private items: InvoiceItem[] = [];
  constructor(readonly cpf: string) { }

  addItem(product: OrderProduct): void {
    this.items.push(new InvoiceItem(product.product.id, product.getTotal()));
  }

  getItems(): ReadonlyArray<InvoiceItem> {
    return this.items;
  }
}

export class InvoiceItem {
  constructor(readonly productId: number, readonly total: number) { }

}