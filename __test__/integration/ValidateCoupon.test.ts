import ValidateCoupon from "application/usecase/ValidateCoupon";
import { Coupon, CouponType } from "domain/entity/Coupon";
import CouponRepository from "domain/repository/CouponRepository";
import CouponRepositoryMem from "infra/repository/memory/CouponRepositoryMem";

describe("ValidateCoupon", () => {

  let couponRepository: CouponRepository;

  beforeEach(() => {
    couponRepository = new CouponRepositoryMem();
  });

  test("Coupon should returns false when is invalid", async () => {
    const isValid = await new ValidateCoupon(couponRepository).execute("VAL20");
    expect(isValid).toBeFalsy();
  })

  test("Coupon should returns true when is valid", async () => {
    couponRepository.save(new Coupon("VAL20", 1, CouponType.PERCENTAGE));
    const isValid = await new ValidateCoupon(couponRepository).execute("VAL20");
    expect(isValid).toBeTruthy();
  })
})