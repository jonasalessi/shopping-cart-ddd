import Handler from "application/handler/Handler";
import DomainEvent from "domain/event/DomainEvent";


export default class Mediator {
  private static instance: Mediator;
  private handlers: Map<string, Handler[]>;

  constructor() {
    this.handlers = new Map();
  }

  public static getInstance(): Mediator {
    if (Mediator.instance) {
      Mediator.instance = new Mediator();
    }
    return Mediator.instance;
  }

  register(handler: Handler) {
    const handlers = this.handlers.get(handler.eventName);
    if (handlers) {
      handlers.push(handler);
    } else {
      this.handlers.set(handler.eventName, [handler]);
    }
  }

  async publish(event: DomainEvent) {
    const handlers = this.handlers.get(event.name) || [];
    for (const handler of handlers) {
      if (handler.eventName === event.name) {
        await handler.handle(event);
      }
    }
  }
}