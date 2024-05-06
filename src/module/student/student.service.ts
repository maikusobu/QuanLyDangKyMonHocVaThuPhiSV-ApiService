import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { StudentRepository } from "@repository/student/student.repository";

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}

  async create(createStudentDto: CreateStudentDto) {
    return await this.studentRepository.createStudent(createStudentDto);
  }

  async findFilteredStudentByNameOrByMSSV(
    name?: string,
    mssv?: string,
    page?: number,
  ) {
    return this.studentRepository.findFilteredStudentByNameOrByMSSV(
      name,
      mssv,
      page,
    );
  }

  async findOne(id: number) {
    return this.studentRepository.findStudentById(id);
  }

  async update(id: number, updateStudentDto: CreateStudentDto) {
    return this.studentRepository.updateStudentById(id, updateStudentDto);
  }
  async delete(id: number) {
    return this.studentRepository.deleteStudentById(id);
  }
}
