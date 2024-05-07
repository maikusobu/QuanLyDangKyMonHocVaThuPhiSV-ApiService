import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { major } from "@db/schema";
@Injectable()
export class MajorRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}
  async getAllMajor() {
    return await this.drizzle.select().from(major);
  }
  async findProgramByMajorId(id: number) {
    return await this.drizzle.query.program.findFirst({
      where: ({ majorId }, { eq }) => eq(majorId, id),
      with: {
        major: true,
        programItems: {
          with: {
            course: true,
          },
        },
      },
    });
  }
}
