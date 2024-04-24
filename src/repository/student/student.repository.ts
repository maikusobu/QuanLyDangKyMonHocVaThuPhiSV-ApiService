import { Inject, Injectable } from "@nestjs/common";
import { student } from "@db/schema";
import { CreateStudentDto } from "src/module/student/dto/create-student.dto";
import { Drizzle } from "@type/drizzle.type";

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
