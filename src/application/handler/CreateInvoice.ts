
import Invoice from 'domain/entity/Invoice';
import PlacedOrder from 'domain/event/PlacedOrder';
import RepositoryFactory from 'domain/factory/RepositoryFactory';
import InvoiceRepository from 'domain/repository/InvoiceRepository';
import Handler from './Handler';

export class CreateInvoice implements Handler {
  readonly eventName = 'PlacedOrder';
  private invoiceRepository: InvoiceRepository;

  constructor(repositoryFactory: RepositoryFactory) {
    this.invoiceRepository = repositoryFactory.createInvoiceRepository();
  }

  async handle(event: PlacedOrder): Promise<void> {
    const invoice = new Invoice(event.order.getCpf())
    event.order.getProducts().forEach(product => invoice.addItem(product));
    this.invoiceRepository.save(invoice);
  }
}