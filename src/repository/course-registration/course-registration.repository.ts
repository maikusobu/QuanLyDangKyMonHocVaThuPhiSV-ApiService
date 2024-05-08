import { courseRegistration, courseRegistrationItem } from "@db/schema";
import { CreateCourseRegistrationItemDto } from "@module/course-registration/dto/create-course-registration-item-dto";
import { CreateCourseRegistrationDto } from "@module/course-registration/dto/create-course-registration.dto";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";

@Injectable()
export class CourseRegistrationRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

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

  async findAll() {
    throw new Error("Method not implemented.");
  }
}
