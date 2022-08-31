import Invoice from 'domain/entity/Invoice';
import InvoiceRepository from 'domain/repository/InvoiceRepository';
import Connection from 'infra/database/Connection';

export default class InvoiceRepositoryDatabase implements InvoiceRepository {

  constructor(private readonly connection: Connection) { }

  save(invoice: Invoice): Promise<void> {
    throw new Error('Method not implemented.');
  }

  findAllByCpf(cpf: string): Promise<Invoice[]> {
    throw new Error('Method not implemented.');
  }
}