import { Inject, Injectable } from "@nestjs/common";
import { student } from "src/db/schema";
import { CreateStudentDto } from "src/module/student/dto/create-student.dto";
import { Drizzle } from "src/type/drizzle.type";

@Injectable()
export class StudentRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    return await this.drizzle
      .insert(student)
      .values(createStudentDto)
      .returning();
  }
}
