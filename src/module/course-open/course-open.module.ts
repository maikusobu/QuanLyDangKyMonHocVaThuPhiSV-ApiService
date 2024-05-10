import { Module } from "@nestjs/common";
import { CourseOpenService } from "./course-open.service";
import { CourseOpenController } from "./course-open.controller";
import { CourseOpenRepository } from "@repository/course-open/course-open.repository";
import { CourseOpenTermRepository } from "@repository/course-open/course-open-term.repository";
import { CourseRepository } from "@repository/course/course.repository";

@Module({
  controllers: [CourseOpenController],
  providers: [
    CourseOpenService,
    CourseOpenRepository,
    CourseOpenTermRepository,
    CourseRepository,
  ],
})
export class CourseOpenModule {}
