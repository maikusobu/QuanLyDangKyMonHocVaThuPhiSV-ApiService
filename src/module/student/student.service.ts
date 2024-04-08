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

  findAll() {
    return `This action returns all student`;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    console.log("updateStudentDto", updateStudentDto);
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}
