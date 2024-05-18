import {
  courseRegistration,
  courseRegistrationItem,
  student,
} from "@db/schema";
import { CreateCourseRegistrationItemDto } from "@module/course-registration/dto/create-course-registration-item-dto";
import { CreateCourseRegistrationDto } from "@module/course-registration/dto/create-course-registration.dto";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { TERM } from "@util/constants";
import { and, eq } from "drizzle-orm";
import { resolveTerm } from "./helper/resolveTerm";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";
@Injectable()
export class CourseRegistrationRepository {
  constructor(
    @Inject("DRIZZLE") private drizzle: Drizzle,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async create(createCourseRegistrationDto: CreateCourseRegistrationDto) {
    return await this.drizzle
      .insert(courseRegistration)
      .values(createCourseRegistrationDto)
      .returning();
  }
  async createCourseRegistrationItem(
    createCourseRegistrationItemDto: CreateCourseRegistrationItemDto,
  ) {
    return await this.drizzle
      .insert(courseRegistrationItem)
      .values(createCourseRegistrationItemDto)
      .returning();
  }

  async findAllWithMajorId(majorId: number, year: number, term: TERM) {
    return await this.drizzle.query.courseRegistration.findMany({
      where: and(
        eq(courseRegistration.year, year),
        eq(courseRegistration.term, term),
        eq(student.majorId, majorId),
      ),
      with: {
        student: {
          columns: {},
        },
      },
    });
  }

  async deleteAllCourseRegistrationItem(courseRegistrationId: number) {
    return await this.drizzle
      .delete(courseRegistrationItem)
      .where(
        eq(courseRegistrationItem.courseRegistrationId, courseRegistrationId),
      )
      .returning();
  }

  async findAll(year: number, term: TERM) {
    const registration = await this.drizzle.query.courseRegistration.findMany({
      where: and(
        eq(courseRegistration.year, year),
        eq(courseRegistration.term, term),
      ),
      columns: {
        studentId: false,
      },
      with: {
        student: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
    return registration;
  }
  async findCurrentRegistrationDeparment(term: TERM, year: number) {
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
