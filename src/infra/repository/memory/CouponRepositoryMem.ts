import { Coupon } from "domain/entity/Coupon";
import CouponRepository from "domain/repository/CouponRepository";

export default class CouponRepositoryMem implements CouponRepository {
  private data: Coupon[] = [];

  async findByCode(code: string): Promise<Coupon | undefined> {
    return this.data.find(coupon => coupon.code === code)
  }

  async save(coupon: Coupon): Promise<Coupon> {
    this.data.push(coupon);
    return coupon;
  }

  async deleteAll(): Promise<void> {
    this.data = []
  }
}