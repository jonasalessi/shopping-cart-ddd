import Invoice from "domain/entity/Invoice";

export default interface InvoiceRepository {

  findAllByCpf(cpf: string): Promise<Invoice[]>;
}