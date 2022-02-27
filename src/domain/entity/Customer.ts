import { Cpf } from "./CPF";

 
export class Customer {
  cpf: Cpf;

  constructor(cpf: string) {
    this.cpf = new Cpf(cpf);
  }
}