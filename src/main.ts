import { BeanFactoryImpl } from "infra/BeaFactoryImpl";
import PostgreSqlConnectionAdapter from "./infra/database/PostgreSqlConnectionAdapter";
import ExpressHttp from "./infra/http/ExpressHttp";
import Router from "./infra/http/Router";

/**
 * This class knows the concrete implementations
 * -- Frameworks and Driver layer --
 */

console.log("Initializing...");
const connection = new PostgreSqlConnectionAdapter();
const beanFactory = new BeanFactoryImpl(connection);
const http = new ExpressHttp();
const router = new Router(http, beanFactory);
router.init();
http.listen(8008).then(() => console.log("Startup ok!"));
