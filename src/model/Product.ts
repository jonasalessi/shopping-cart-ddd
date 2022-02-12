export class Product {

  readonly name: string;
  readonly description: string;
  readonly value: number;

  constructor(name: string, description: string, value: number) {
    this.name = name;
    this.description = description;
    this.value = value;
  }
}