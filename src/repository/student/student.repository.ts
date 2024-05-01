import { Inject, Injectable } from "@nestjs/common";
import { student } from "@db/schema";
import { CreateStudentDto } from "src/module/student/dto/create-student.dto";
import { Drizzle } from "@type/drizzle.type";
import { eq } from "drizzle-orm";
import { UpdateStudentDto } from "@module/student/dto/update-student.dto";
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
    return await this.drizzle
      .insert(student)
      .values(createStudentDto)
      .returning();
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
  async updateStudentById(id: number, updateStudentDto: UpdateStudentDto) {
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

      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    if (name !== "" && mssv === "") {
      console.log("name", name);
      return students.filter((student) =>
        student.name.toLowerCase().includes(name.toLowerCase()),
      );
    }

    if (name === "" && mssv !== "") {
      console.log("mssv", mssv);
      return students.filter((student) =>
        student.id.toString().includes(String(mssv)),
      );
    }

    return students;
  }

  async deleteStudentById(id: number) {
    return await this.drizzle
      .delete(student)
      .where(eq(student.id, id))
      .returning();
  }
}
