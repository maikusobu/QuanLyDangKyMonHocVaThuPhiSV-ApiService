import { Module } from "@nestjs/common";
import { CourseOpenService } from "./course-open.service";
import { CourseOpenController } from "./CourseOpenController";

@Module({
  controllers: [CourseOpenController],
  providers: [CourseOpenService],
})
export class CourseOpenModule {}
