import { Injectable } from "@nestjs/common";
import { CreateCourseOpenDto } from "./dto/create-course-open.dto";
import { CourseOpenRepository } from "@repository/course-open/course-open.repository";
import { FindCourseOpenDto } from "./dto/find-course-open.dto";
import { DeleteCourseOpenDto } from "./dto/delete-course-open.dto";
import { CloseCurrentStateDto } from "./dto/close-current-state.dto";
import { TuitionRepository } from "@repository/tuition/tuition.repository";
import { TERM } from "@util/constants";
import { CourseRegistrationRepository } from "@repository/course-registration/course-registration.repository";

@Injectable()
export class CourseOpenService {
  constructor(
    private courseOpenRepository: CourseOpenRepository,
    private tuitionRepository: TuitionRepository,
    private courseRegistrationRepository: CourseRegistrationRepository,
  ) {}

  async closeCurrentState(closeCurrentStateDto: CloseCurrentStateDto) {
    const result =
      await this.courseOpenRepository.closeCurrentState(closeCurrentStateDto);

    // Background task to calculate tuition for all students
    this.computeTuition(closeCurrentStateDto.term, closeCurrentStateDto.year)
      .catch((error) => {
        console.error("Failed to calculate tuition:", error);
      })
      .finally(() => {
        console.log("Tuition calculation completed");
      });

    return result;
  }

  private async computeTuition(term: TERM, year: number) {
    // 1. find all courseRegistration in current term and year
    // 2. for each courseRegistration, calculate tuition by summing up the unitPrice of each course
    const registrations = await this.courseRegistrationRepository.findAll(
      year,
      term,
    );

    const promises = [];
    for (const registration of registrations) {
      promises.push(this.tuitionRepository.computeTuition(registration.id));
    }
    await Promise.all(promises);
  }

  async create(createCourseOpenDto: CreateCourseOpenDto) {
    return await this.courseOpenRepository.create(createCourseOpenDto);
  }

  async findAllOneTerm(findCourseOpenDto: FindCourseOpenDto) {
    return this.courseOpenRepository.findAllOneTerm(
      findCourseOpenDto.term,
      findCourseOpenDto.year,
    );
  }

  delete(deleteCourseOpenDto: DeleteCourseOpenDto) {
    return this.courseOpenRepository.delete(deleteCourseOpenDto);
  }

  // async findAllOneTerm(findCourseOpenDto: FindCourseOpenDto) {
  //   // Get the termYear
  //   const termYearID = (
  //     await this.courseOpenTermRepository.get(findCourseOpenDto)
  //   ).id;
  //   // Get all courses for that term
  //   const coursesID =
  //     await this.courseOpenRepository.findAllOneTerm(termYearID);
  //   // Create a lookup object from coursesID
  //   const coursesIDLookup = coursesID.reduce((lookup, course) => {
  //     lookup[course.courseId] = course.availableCourseId;
  //     return lookup;
  //   }, {});
  //   // Get all courses
  //   const courses = await this.courseRepository.findByIds(
  //     coursesID.map((c) => c.courseId),
  //   );
  //   // Merge availableCourseId into courses
  //   const mergedCourses = courses.map((course) => ({
  //     ...course,
  //     availableCourseId: coursesIDLookup[course.id],
  //   }));

  //   return mergedCourses;
  // }

  // async create(createCourseOpenDto: CreateCourseOpenDto) {
  //   // Check if term exists, if not create it
  //   const term = createCourseOpenDto.term;
  //   const year = createCourseOpenDto.year;
  //   const termYear = await this.courseOpenTermRepository.createIfNotExists(
  //     term,
  //     year,
  //   );
  //   // Check if course exists, if not create it
  //   try {
  //     const courseOpen = await this.courseOpenRepository.createCourseOpen({
  //       courseId: createCourseOpenDto.courseId,
  //       availableCourseId: termYear.id,
  //     });
  //     return courseOpen;
  //   } catch (e) {
  //     throw new HttpException("Course already exists", 400);
  //   }
  // }
}
