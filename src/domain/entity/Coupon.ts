export class Coupon {

  constructor(readonly code: string, readonly value: number, readonly type: CouponType, readonly expired?: Date) {
  }

  applyValue(total: number): number {
    return total - (this.value / 100 * total);
  }

  isExpired(today: Date = new Date()): boolean {
    if (!this.expired) {
      return false;
    }
    return today.getTime()  > this.expired.getTime();
  } 

  static ofPercent(code: string, percent: number, expired?: Date): Coupon {
    return new Coupon(code, percent, CouponType.PERCENTAGE, expired);
  }

}

export enum CouponType {
  PERCENTAGE
}