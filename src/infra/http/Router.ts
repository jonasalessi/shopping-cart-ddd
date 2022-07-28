import PlaceOrder, { PlaceOrderCommand } from "./../../application/usecase/PlaceOrder";
import Http from "./Http";
import { BeanFactory } from "domain/factory/BeanFactory";

export default class Router {
  constructor(readonly http: Http, readonly beanFactory: BeanFactory) { }

  init(): void {
    this.http.route("post", "/order", ({ body }: { body: any }) => {
      const command = body as PlaceOrderCommand;
      return new PlaceOrder(this.beanFactory).execute(command);
    });
  }
}
