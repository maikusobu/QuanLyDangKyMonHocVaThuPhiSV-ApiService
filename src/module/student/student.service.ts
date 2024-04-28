import { Injectable } from "@nestjs/common";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { StudentRepository } from "@repository/student/student.repository";

@Injectable()
export class StudentService {
  constructor(private studentRepository: StudentRepository) {}

  async create(createStudentDto: CreateStudentDto) {
    return await this.studentRepository.createStudent(createStudentDto);
  }

  async findFilteredStudentByNameOrByMSSV(name?: string, mssv?: string) {
    return this.studentRepository.findFilteredStudentByNameOrByMSSV(name, mssv);
  }

  async findOne(id: number) {
    return this.studentRepository.findStudentById(id);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    return this.studentRepository.updateStudentById(id, updateStudentDto);
  }
  async delete(id: number) {
    return this.studentRepository.deleteStudentById(id);
  }
}
