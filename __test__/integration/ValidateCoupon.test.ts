import ValidateCoupon from "../../src/application/usecase/ValidateCoupon";
import { Coupon, CouponType } from "../../src/domain/entity/Coupon";
import CouponRepository from "../../src/domain/repository/CouponRepository";
import CouponRepositoryMem from "../repository/CouponRepositoryMem";

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