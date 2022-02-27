import {  Cpf, CpfInvalid } from "../../src/domain/entity/CPF"

const validCPFs = [
  '111.444.777-35',
  '386.005.508-90',
  '397.974.888-02',
  '192 531.148-19'
]

describe.each(validCPFs)('Testing valid CPF', cpf => {
  test(`Should accept valid CPF ${cpf}`, () => {
    const cpfCreated = new Cpf(cpf)
    expect(cpfCreated.getValue()).toBe(cpf);
  });
})


test('Should not accept an empty invalid CPF', () => {
  expect(() => new Cpf('')).toThrow(CpfInvalid);
});


test('Should not accept an invalid CPF', () => {
  expect(() => new Cpf('192.531.148-12')).toThrow(CpfInvalid);
});

test('Should not accept CPF with not minimal digits', () => {
  expect(() =>  new Cpf('123')).toThrow(CpfInvalid);
});

test('Should not accept CPF greather than minimal digits', () => {
  expect(() => new Cpf('122424234242423243312345612345678')).toThrow(CpfInvalid);
});