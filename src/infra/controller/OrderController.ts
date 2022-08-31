import PlaceOrder, { PlaceOrderCommand } from "application/usecase/PlaceOrder";
import { BeanFactory } from "domain/factory/BeanFactory";
import Http from "infra/http/Http";

export default class OrderController {

  constructor(readonly http: Http, readonly beanFactory: BeanFactory) {
    http.route("post", "/order", ({ body }: { body: any }) => {
      const command = body as PlaceOrderCommand;
      const placeOrder = new PlaceOrder(beanFactory.dao(), beanFactory.repositories());
      return placeOrder.execute(command);
    });
  }


}