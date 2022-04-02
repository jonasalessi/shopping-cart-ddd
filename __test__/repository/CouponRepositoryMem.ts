import { Coupon } from "../../src/domain/entity/Coupon";
import CouponRepository from "../../src/domain/repository/CouponRepository";

export default class CouponRepositoryMem implements CouponRepository {
  
  private readonly data: Coupon[] = [];

  findByCode(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(this.data.find(coupon => coupon.code === code))
  }
  save(coupon: Coupon): Promise<Coupon> {
    this.data.push(coupon);
    return Promise.resolve(coupon);
  }
 
}