import { availableCourseItem, InsertAvailableCourseItem } from "@db/schema";
import { DeleteCourseOpenDto } from "@module/course-open/dto/delete-course-open.dto";
import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { resolveTerm } from "@repository/course-registration/helper/resolveTerm";
import { Drizzle } from "@type/drizzle.type";
import { TERM } from "@util/constants";
import { and, eq } from "drizzle-orm";
import { firstValueFrom } from "rxjs";

@Injectable()
export class CourseOpenRepository {
  constructor(
    @Inject("DRIZZLE") private drizzle: Drizzle,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

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

  async delete(deleteCourseOpenDto: DeleteCourseOpenDto) {
    return this.drizzle
      .delete(availableCourseItem)
      .where(
        and(
          eq(availableCourseItem.courseId, deleteCourseOpenDto.courseId),
          eq(
            availableCourseItem.availableCourseId,
            deleteCourseOpenDto.availableCourseId,
          ),
        ),
      )
      .returning();
  }

  async findAllOneTerm(term: TERM, year: number) {
    const termResolved = resolveTerm(term);
    const url = this.configService.get<string>("service");
    const { data } = await firstValueFrom(
      this.httpService.get(
        `${url}/open_course?term=${termResolved}&year=${year}`,
      ),
    );
    if (!data) {
      this.httpService.patch(`${url}/open_course`, {
        term: termResolved,
        year,
        majors: [],
      });
      return {
        term: termResolved,
        year,
        majors: [],
      };
    }
    return data;
  }
}
