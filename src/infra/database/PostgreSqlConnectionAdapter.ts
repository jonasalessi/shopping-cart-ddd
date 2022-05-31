import Connection from "./Connection";
import pgp from 'pg-promise';

export default class PostgreSqlConnectionAdapter  implements Connection {
  
  private readonly connection: any;

  constructor() {
    const initOptions = {
      schema: `${process.env.NODE_ENV}`
  };
    this.connection = pgp(initOptions)(`postgres://admin:admin@localhost:5432/store`)
  }

  query(statement: string, params: any): Promise<any> {
     return this.connection.query(statement, params);
  }

}