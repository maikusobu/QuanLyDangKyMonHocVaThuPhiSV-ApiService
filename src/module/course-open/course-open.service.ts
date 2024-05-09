import { HttpException, Injectable } from "@nestjs/common";
import { CreateCourseOpenDto } from "./dto/create-course-open.dto";
import { CourseOpenRepository } from "@repository/course-open/course-open.repository";
import { CourseOpenTermRepository } from "@repository/course-open/course-open-term.repository";
import { TERM } from "@util/constants";

@Injectable()
export class CourseOpenService {
  constructor(
    private courseOpenRepository: CourseOpenRepository,
    private courseOpenTermRepository: CourseOpenTermRepository,
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

  async findAllOneTerm(year: number, term: TERM) {
    // Get the termYear
    const termYearID = (await this.courseOpenTermRepository.get(year, term)).id;
    // Get all courses for that term
    const courses = await this.courseOpenRepository.findAllOneTerm(termYearID);
    return courses;
  }
}
