import { Coupon } from "domain/entity/Coupon";
import CouponRepository from "domain/repository/CouponRepository";

export default class CouponRepositoryMem implements CouponRepository {
  private data: Coupon[] = [];

  findByCode(code: string): Promise<Coupon | undefined> {
    return Promise.resolve(this.data.find(coupon => coupon.code === code))
  }
  save(coupon: Coupon): Promise<Coupon> {
    this.data.push(coupon);
    return Promise.resolve(coupon);
  }

  deleteAll(): Promise<void> {
    this.data = []
    return Promise.resolve();
  }
}