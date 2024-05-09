import { availableCourse } from "@db/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { TERM } from "@util/constants";
import { and, eq } from "drizzle-orm";

@Injectable()
export class CourseOpenTermRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async get(year: number, term: TERM) {
    const termYear = await this.drizzle.query.availableCourse.findFirst({
      where: and(
        eq(availableCourse.term, term),
        eq(availableCourse.year, year),
      ),
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
