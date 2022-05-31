import CouponRepository from "../../domain/repository/CouponRepository";

export default class ValidateCoupon {

  constructor(readonly  couponRepository: CouponRepository){}
  
  async execute(coupon: string): Promise<boolean> {
    const isValid = (await this.couponRepository.findByCode(coupon)) != undefined;
    return isValid === true;
  }
}
