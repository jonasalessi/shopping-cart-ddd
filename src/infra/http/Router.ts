import PlaceOrder, { PlaceOrderCommand } from "./../../application/usecase/PlaceOrder";
import Http from "./Http";
import RepositoryFactoryDatabase from "./../repository/database/RepositoryFactoryDatabase";

export default class Router {
  constructor(readonly http: Http, readonly repositoryFactory: RepositoryFactoryDatabase) {}

  init(): void {
    this.http.route("post", "/order", ({ body }) => {
      const command = body as PlaceOrderCommand;
      return new PlaceOrder(this.repositoryFactory).execute(command);
    });
  }
}
