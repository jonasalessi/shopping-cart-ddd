export class Cupom { 

  constructor(readonly value: number, readonly type: CupomType) { 
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