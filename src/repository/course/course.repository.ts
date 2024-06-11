import { CreateCourseDto } from "@module/course/dto/create-course.dto";
import { FilterCourseDto } from "@module/course/dto/filter-course.dto";
import { UpdateCourseDto } from "@module/course/dto/update-course.dto";
import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { and, eq, inArray, like, sql } from "drizzle-orm";
import { availableCourse, course } from "@db/schema";
import { Drizzle } from "@type/drizzle.type";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { firstValueFrom } from "rxjs";

@Injectable()
export class CourseRepository {
  constructor(
    @Inject("DRIZZLE") private drizzle: Drizzle,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async create(body: CreateCourseDto) {
    return await this.drizzle.insert(course).values(body).returning();
  }

  async findAll() {
    return await this.drizzle.query.course.findMany({
      with: {
        courseType: true,
        faculty: true,
      },
      where: eq(course.isDeleted, false),
    });
  }

  async findAllByFilter({ search }: FilterCourseDto) {
    return await this.drizzle.query.course.findMany({
      where: and(eq(course.isDeleted, false), like(course.name, `%${search}%`)),
      with: {
        courseType: true,
        faculty: true,
      },
    });
  }

  async findOne(id: number) {
    return await this.drizzle.query.course.findFirst({
      where: and(eq(course.id, id), eq(course.isDeleted, false)),
      with: {
        courseType: true,
        faculty: true,
      },
    });
  }

  async update(id: number, body: UpdateCourseDto) {
    const currentState = await this.checkCurrentState();
    if (currentState) {
      return new HttpException(
        "Cannot update course when registration is open",
        HttpStatus.BAD_REQUEST,
      );
    }
    if (body.numberOfPeriods) {
      // set the current course isDeleted to true
      const prevCourse = await this.drizzle
        .update(course)
        .set({ isDeleted: true })
        .where(eq(course.id, id))
        .returning();

      if (!prevCourse.length) {
        return new HttpException("Course not found", HttpStatus.NOT_FOUND);
      }

      // create a new course with the updated values
      const newCourse = {
        name: null,
        courseTypeId: null,
        facultyId: null,
        numberOfPeriods: body.numberOfPeriods,
      };

      if (!body.name) {
        newCourse.name = prevCourse[0].name;
      } else {
        newCourse.name = body.name;
      }
      if (!body.courseTypeId) {
        newCourse.courseTypeId = prevCourse[0].courseTypeId;
      } else {
        newCourse.courseTypeId = body.courseTypeId;
      }
      if (!body.facultyId) {
        newCourse.facultyId = prevCourse[0].facultyId;
      } else {
        newCourse.facultyId = body.facultyId;
      }

      return await this.drizzle.insert(course).values(newCourse).returning();
    } else {
      return await this.drizzle
        .update(course)
        .set(body)
        .where(eq(course.id, id))
        .returning();
    }
  }

  async remove(id: number) {
    const currentState = await this.checkCurrentState();
    if (currentState) {
      return new HttpException(
        "Cannot delete course when registration is open",
        HttpStatus.BAD_REQUEST,
      );
    }
    return await this.drizzle
      .update(course)
      .set({ isDeleted: true })
      .where(eq(course.id, id))
      .returning();
  }

  async findByIds(ids: number[]) {
    return await this.drizzle.query.course.findMany({
      columns: {
        courseTypeId: false,
        facultyId: false,
      },
      where: and(inArray(course.id, ids), eq(course.isDeleted, false)),
      with: {
        courseType: true,
        faculty: true,
      },
    });
  }

  private async checkCurrentState() {
    const url = this.configService.get<string>("service");
    const { data: courseRegistrationState } = await firstValueFrom(
      this.httpService.get(`${url}/registration_state`),
    );

    let result = true;
    if (!courseRegistrationState) {
      result = true;
    } else if (!courseRegistrationState.available) {
      result = false;
      return false;
    }

    const courseOpenState = await this.drizzle.execute(sql`
    SELECT * 
    FROM ${availableCourse}
    ORDER BY ${availableCourse.year} DESC, ${availableCourse.term} DESC
    LIMIT 1`);

    if (courseOpenState.length > 0) {
      const { available } = courseOpenState[0];
      return result && available;
    } else {
      return result;
    }
  }
}
