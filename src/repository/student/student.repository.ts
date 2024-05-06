import { Inject, Injectable } from "@nestjs/common";
import { student } from "@db/schema";
import { CreateStudentDto } from "src/module/student/dto/create-student.dto";
import { Drizzle } from "@type/drizzle.type";
import { eq } from "drizzle-orm";

import { ProvinceDistrictRepository } from "@repository/province/province.repository";

@Injectable()
export class StudentRepository {
  constructor(
    @Inject("DRIZZLE") private drizzle: Drizzle,
    private readonly provinceDistrictRepository: ProvinceDistrictRepository,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const isMinor = await this.provinceDistrictRepository.isMinor(
      createStudentDto.districtId,
    );
    if (createStudentDto.priorityId === 4) {
      if (isMinor) {
        createStudentDto.priorityId = 3;
      }
    }
    const studentCreated = await this.drizzle
      .insert(student)
      .values(createStudentDto)
      .returning();
    await this.drizzle
      .update(student)
      .set({
        mssv: studentCreated[0].id.toString(),
      })
      .where(eq(student.id, studentCreated[0].id))
      .execute();
    return studentCreated;
  }
  async findStudentById(id: number) {
    return await this.drizzle.query.student.findFirst({
      where: eq(student.id, id),
      with: {
        major: {
          with: {
            faculty: true,
          },
        },
        district: {
          with: {
            province: true,
          },
        },
        priority: true,
      },
    });
  }
  async updateStudentById(id: number, updateStudentDto: CreateStudentDto) {
    return await this.drizzle
      .update(student)
      .set(updateStudentDto)
      .where(eq(student.id, id))
      .returning();
  }
  async findFilteredStudentByNameOrByMSSV(name = "", mssv = "", page = 1) {
    const pageSize = 20;

    const students = await this.drizzle.query.student.findMany({
      with: {
        major: {
          with: {
            faculty: true,
          },
        },
        district: {
          with: {
            province: true,
          },
        },
        priority: true,
      },
      where: (students, { or, ilike }) => {
        return or(
          ilike(students.name, `%${name}%`),
          ilike(student.mssv, `%${mssv}%`),
        );
      },
      limit: pageSize,
      offset: (page - 1) * pageSize,
      orderBy: (students, { desc }) => [desc(students.id)],
    });

    return students;
  }

  async deleteStudentById(id: number) {
    return await this.drizzle
      .delete(student)
      .where(eq(student.id, id))
      .returning();
  }
}
