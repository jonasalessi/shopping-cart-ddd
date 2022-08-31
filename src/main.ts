import { BeanFactoryImpl } from "infra/BeaFactoryImpl";
import OrderController from "infra/controller/OrderController";
import PostgreSqlConnectionAdapter from "./infra/database/PostgreSqlConnectionAdapter";
import ExpressHttp from "./infra/http/ExpressHttp";

/**
 * This class knows the concrete implementations
 * -- Frameworks and Driver layer --
 */

console.log("Initializing...");
const connection = new PostgreSqlConnectionAdapter();
const beanFactory = new BeanFactoryImpl(connection);
const http = new ExpressHttp();
new OrderController(http, beanFactory);
http.listen(8008).then(() => console.log("Startup ok!"));
