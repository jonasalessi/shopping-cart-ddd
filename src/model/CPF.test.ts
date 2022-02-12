import { CPF, CpfInvalid } from "./CPF";

test('Should accept valid CPF', () => {
  const cpf = new CPF('111.444.777-35')

  expect(cpf.digits).toBe('11144477735');
});

test('Should accept valid CPF with empty chars different of digits', () => {
  const cpf = new CPF('192 531.148-19')

  expect(cpf.digits).toBe('19253114819');
});
 

test('Should not accept an empty invalid CPF', () => {
  const cpfEmpty = () => {
    new CPF('');
  }
  expect(cpfEmpty).toThrow(CpfInvalid);
});

test('Should not accept an invalid CPF', () => {
  const cpfInvalidNumber = () => {
    new CPF('192.531.148-121');
  }
  expect(cpfInvalidNumber).toThrow(CpfInvalid);
});
  
test('Should not accept CPF with not minimal digits', () => {
  const cpfInvalid = () => {
    new CPF('123');
  }
  expect(cpfInvalid).toThrow(CpfInvalid); 
});

test('Should not accept CPF greather than minimal digits', () => {
  const cpfInvalid = () => {
    new CPF('122424234242423243312345612345678');
  }
  expect(cpfInvalid).toThrow(CpfInvalid); 
});