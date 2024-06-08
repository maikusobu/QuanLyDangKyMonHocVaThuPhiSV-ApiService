import { Module } from "@nestjs/common";
import { CourseService } from "./course.service";
import { CourseController } from "./course.controller";
import { CourseRepository } from "@repository/course/course.repository";
import { HttpModule } from "@nestjs/axios";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [CourseController],
  providers: [CourseService, CourseRepository],
})
export class CourseModule {}
