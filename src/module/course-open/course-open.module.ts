import { Module } from "@nestjs/common";
import { CourseOpenService } from "./course-open.service";
import { CourseOpenController } from "./course-open.controller";

@Module({
  controllers: [CourseOpenController],
  providers: [CourseOpenService],
})
export class CourseOpenModule {}
