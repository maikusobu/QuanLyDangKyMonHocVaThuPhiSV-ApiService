import { HttpException, Injectable } from "@nestjs/common";
import { CreateCourseOpenDto } from "./dto/create-course-open.dto";
import { CourseOpenRepository } from "@repository/course-open/course-open.repository";
import { CourseOpenTermRepository } from "@repository/course-open/course-open-term.repository";
import { CourseRepository } from "@repository/course/course.repository";
import { FindCourseOpenDto } from "./dto/find-course-open.dto";
import { DeleteCourseOpenDto } from "./dto/delete-course-open.dto";

@Injectable()
export class CourseOpenService {
  constructor(
    private courseOpenRepository: CourseOpenRepository,
    private courseOpenTermRepository: CourseOpenTermRepository,
    private courseRepository: CourseRepository,
  ) {}

  async create(createCourseOpenDto: CreateCourseOpenDto) {
    // Check if term exists, if not create it
    const term = createCourseOpenDto.term;
    const year = createCourseOpenDto.year;
    const termYear = await this.courseOpenTermRepository.createIfNotExists(
      term,
      year,
    );
    // Check if course exists, if not create it
    try {
      const courseOpen = await this.courseOpenRepository.createCourseOpen({
        courseId: createCourseOpenDto.courseId,
        availableCourseId: termYear.id,
      });
      return courseOpen;
    } catch (e) {
      throw new HttpException("Course already exists", 400);
    }
  }

  async findOne(findCourseOpenDto: FindCourseOpenDto) {
    if (!findCourseOpenDto.term || !findCourseOpenDto.year) {
      throw new HttpException("Term and year are required", 400);
    }

    return this.courseOpenTermRepository.findOne(findCourseOpenDto);
  }

  delete(deleteCourseOpenDto: DeleteCourseOpenDto) {
    return this.courseOpenRepository.delete(deleteCourseOpenDto);
  }
}
