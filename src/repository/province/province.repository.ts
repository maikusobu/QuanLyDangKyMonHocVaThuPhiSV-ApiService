import { province } from "@db/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { eq } from "drizzle-orm";
import { district } from "@db/schema";
@Injectable()
export class ProvinceDistrictRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}
  async getAllProvince() {
    return await this.drizzle.select().from(province);
  }
  async getDistrictByProvinceId(provinceId: number) {
    return await this.drizzle
      .select()
      .from(district)
      .where(eq(district.provinceId, provinceId));
  }
  async isMinor(districtId: number) {
    const data = await this.drizzle
      .select()
      .from(district)
      .where(eq(district.id, districtId));
    return data[0].isMinor;
  }
}
