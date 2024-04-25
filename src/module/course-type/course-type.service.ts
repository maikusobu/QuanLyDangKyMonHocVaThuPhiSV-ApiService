import { Injectable } from "@nestjs/common";
import { CourseTypeRepository } from "@repository/course-type/course-type.repository";

@Injectable()
export class CourseTypeService {
  constructor(private readonly courseTypeRepository: CourseTypeRepository) {}

  findAll() {
    return this.courseTypeRepository.findAll();
  }
}
