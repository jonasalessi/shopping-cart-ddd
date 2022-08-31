import Invoice from "domain/entity/Invoice";
import InvoiceRepository from "domain/repository/InvoiceRepository";

export default class InvoiceRepositoryMem implements InvoiceRepository {

  private invoices: Invoice[] = [];

  async findAllByCpf(cpf: string): Promise<Invoice[]> {
    return this.invoices.filter(it => it.cpf === cpf)
  }

  async save(invoice: Invoice): Promise<void> {
    this.invoices.push(invoice);
  }
}