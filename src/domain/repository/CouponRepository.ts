import { Coupon } from "../entity/Coupon";

export default interface CouponRepository{
  save(coupon: Coupon):Promise<Coupon>;
  findByCode(code: string): Promise<Coupon | undefined>;
}