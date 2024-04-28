import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { major } from "@db/schema";
@Injectable()
export class MajorRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}
  async getAllMajor() {
    return await this.drizzle.select().from(major);
  }
}
