import { Coupon, CouponType } from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";
import Connection from "../../database/Connection";

export default class CouponRepositoryDatabase implements CouponRepository {

	constructor (readonly connection: Connection) {
	}

	async deleteAll(): Promise<void> {
		await this.connection.query("delete from coupon");
	}

	async findByCode(code: string): Promise<Coupon | undefined> {
		const [couponData] = await this.connection.query("select * from coupon where code = $1", [code]);
		const coupon = new Coupon(couponData.code, parseFloat(couponData.percentage), CouponType.PERCENTAGE, new Date(couponData.issue_date));
		return coupon;
	}	

  async save(coupon: Coupon): Promise<Coupon> {
   await this.connection.query("insert into coupon values ($1, $2, $3)", [coupon.code, coupon.value, coupon.expired]);
	 return coupon;
  }
}