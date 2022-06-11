import PostgreSqlConnectionAdapter from './../../src/infra/database/PostgreSqlConnectionAdapter';

describe.skip('Connection.ts', () => {
  test("Should connect to postgres server", async () => {
    const connection = new PostgreSqlConnectionAdapter();
  
    const [{ data }] = await connection.query("select 1 as data", []);
    expect(data).toBe(1);
  });
})