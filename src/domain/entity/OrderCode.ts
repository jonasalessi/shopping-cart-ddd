export default class OrderCode {

  private _value = "";

  constructor(issueOrder: Date, sequence: number) {
    this._value = this.generateCode(issueOrder, sequence)
  }

  private generateCode(issueOrder: Date, sequence: number): string {
    const year = issueOrder.getFullYear();
    return `${year}${new String(sequence).padStart(8, '0')}` 
  }

  get value(): string { return this._value; }
}