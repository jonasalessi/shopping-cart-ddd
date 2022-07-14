import PostgreSqlConnectionAdapter from "./infra/database/PostgreSqlConnectionAdapter";
import ExpressHttp from "./infra/http/ExpressHttp";
import Router from "./infra/http/Router";
import RepositoryFactoryDatabase from "./infra/repository/database/RepositoryFactoryDatabase";

/**
 * This class knows the concrete implementations
 * -- Frameworks and Driver layer --
 */

console.log("Initializing...");
const connection = new PostgreSqlConnectionAdapter();
const repositoryFactory = new RepositoryFactoryDatabase(connection);
const http = new ExpressHttp();
const router = new Router(http, repositoryFactory);
router.init();
http.listen(8008).then(() => console.log("Startup ok!"));
