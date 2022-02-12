export class Cupom {

  private readonly value: number;
  private readonly type: CupomType;

  constructor(value: number, type: CupomType) {
    this.value = value;
    this.type = type;
  }

  applyValue(total: number): number {
    return total - (this.value / 100 * total);
  }

  static ofPercent(percent: number): Cupom {
    return new Cupom(percent, CupomType.PERCENTUAL);
  }

}

export enum CupomType {
  PERCENTUAL
}