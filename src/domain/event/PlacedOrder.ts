import { Order } from 'domain/entity/Order';
import DomainEvent from './DomainEvent';

export default class PlacedOrder implements DomainEvent {
  readonly name = 'PlacedOrder';
  constructor(readonly order: Order) { }
}