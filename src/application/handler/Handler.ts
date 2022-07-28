import DomainEvent from "../../domain/event/DomainEvent";

export default interface Handler {
  readonly eventName: string;
  handle(event: DomainEvent): Promise<void>;
}