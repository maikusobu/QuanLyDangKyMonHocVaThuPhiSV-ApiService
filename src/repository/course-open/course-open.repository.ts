import { availableCourseItem, InsertAvailableCourseItem } from "@db/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { and, eq } from "drizzle-orm";

@Injectable()
export class CourseOpenRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async createCourseOpen(item: InsertAvailableCourseItem) {
    // check if courseId exists
    const checkForCourseExistence =
      await this.drizzle.query.availableCourseItem.findFirst({
        where: and(
          eq(availableCourseItem.courseId, item.courseId),
          eq(availableCourseItem.availableCourseId, item.availableCourseId),
        ),
      });

    if (checkForCourseExistence) {
      throw new Error("Course already exists");
    }
    const courseOpen = await this.drizzle
      .insert(availableCourseItem)
      .values(item)
      .returning();

    return courseOpen[0];
  }

  findAllOneTerm(termYearID: number) {
    return this.drizzle.query.availableCourseItem.findMany({
      where: eq(availableCourseItem.availableCourseId, termYearID),
    });
  }
}
