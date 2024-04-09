import { Injectable } from "@nestjs/common";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { CourseRepository } from "@repository/course/course.repository";
import { FilterCourseDto } from "./dto/filter-course.dto";

@Injectable()
export class CourseService {
  constructor(private readonly courseRepository: CourseRepository) {}

  create(body: CreateCourseDto) {
    return this.courseRepository.create(body);
  }

  findAll(query: FilterCourseDto) {
    if (query.search) {
      return this.courseRepository.findAllByFilter(query);
    }

    return this.courseRepository.findAll();
  }

  findOne(id: number) {
    return this.courseRepository.findOne(id);
  }

  update(id: number, body: UpdateCourseDto) {
    return this.courseRepository.update(id, body);
  }

  remove(id: number) {
    return this.courseRepository.remove(id);
  }
}
