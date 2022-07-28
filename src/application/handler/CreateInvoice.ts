
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

  handle(event: PlacedOrder): Promise<void> {
    console.log('Do something with ', event);
    return Promise.resolve();
  }
}