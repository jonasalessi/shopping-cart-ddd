import OrderCode from "../../src/domain/entity/OrderCode";

test('Should create order code', () => {
  const order = new OrderCode(new Date('2021-01-01T00:00:00'), 2);
  expect(order.value).toBe("202100000002");
});