import { Module } from "@nestjs/common";
import { CourseTypeService } from "./course-type.service";
import { CourseTypeRepository } from "@repository/course-type/course-type.repository";
import { CourseTypeController } from "./course-type.controller";

@Module({
  controllers: [CourseTypeController],
  providers: [CourseTypeRepository, CourseTypeService],
})
export class CourseTypeModule {}
