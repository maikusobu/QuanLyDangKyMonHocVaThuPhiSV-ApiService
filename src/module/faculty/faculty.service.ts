import { Injectable } from "@nestjs/common";
import { FacultyRepository } from "@repository/faculty/faculty.repository";

@Injectable()
export class FacultyService {
  constructor(private readonly facultyRepository: FacultyRepository) {}

  findAll() {
    return this.facultyRepository.findAll();
  }
}
