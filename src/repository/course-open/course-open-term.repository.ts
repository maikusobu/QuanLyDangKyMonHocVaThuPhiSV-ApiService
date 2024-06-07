import { availableCourse } from "@db/schema";
import { FindCourseOpenDto } from "@module/course-open/dto/find-course-open.dto";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { TERM } from "@util/constants";
import { and, eq } from "drizzle-orm";

@Injectable()
export class CourseOpenTermRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async findOne(findCourseOpenDto: FindCourseOpenDto) {
    const termYear = await this.drizzle.query.availableCourse.findFirst({
      where: and(
        eq(availableCourse.term, findCourseOpenDto.term),
        eq(availableCourse.year, findCourseOpenDto.year),
      ),
      with: {
        availableCourseItems: {
          with: {
            course: {
              with: {
                faculty: true,
                courseType: true,
              },
            },
          },
        },
      },
    });

    return termYear;
  }

  async createIfNotExists(term: TERM, year: number) {
    const checkForExistence =
      await this.drizzle.query.availableCourse.findFirst({
        where: and(
          eq(availableCourse.term, term),
          eq(availableCourse.year, year),
        ),
      });

    if (checkForExistence) {
      return checkForExistence;
    }
    const termYear = await this.drizzle
      .insert(availableCourse)
      .values({
        term,
        year,
      })
      .returning();
    return termYear[0];
  }
}
