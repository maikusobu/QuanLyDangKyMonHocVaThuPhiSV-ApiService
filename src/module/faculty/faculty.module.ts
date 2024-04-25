import { Module } from "@nestjs/common";
import { FacultyController } from "./faculty.controller";
import { FacultyRepository } from "@repository/faculty/faculty.repository";
import { FacultyService } from "./faculty.service";

@Module({
  controllers: [FacultyController],
  providers: [FacultyRepository, FacultyService],
})
export class FacultyModule {}
