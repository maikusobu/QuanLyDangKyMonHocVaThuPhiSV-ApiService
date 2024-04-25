import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";

@Injectable()
export class CourseTypeRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async findAll() {
    return await this.drizzle.query.courseType.findMany();
  }
}
