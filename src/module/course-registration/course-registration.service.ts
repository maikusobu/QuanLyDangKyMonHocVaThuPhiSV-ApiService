import { Injectable } from "@nestjs/common";
import { CreateCourseRegistrationFormDto } from "./dto/create-course-registration-form.dto";
import { CourseRegistrationRepository } from "@repository/course-registration/course-registration.repository";
import { CreateCourseRegistrationDto } from "./dto/create-course-registration.dto";
import { CreateCourseRegistrationItemDto } from "./dto/create-course-registration-item-dto";

@Injectable()
export class CourseRegistrationService {
  constructor(
    private readonly courseRegistrationRepository: CourseRegistrationRepository,
  ) {}

  async create(
    createCourseRegistrationFormDto: CreateCourseRegistrationFormDto,
  ) {
    // Map form into DTO
    const courseRegistrationDto = new CreateCourseRegistrationDto();
    courseRegistrationDto.registrationDate =
      createCourseRegistrationFormDto.registrationDate;
    courseRegistrationDto.studentId = createCourseRegistrationFormDto.studentId;
    courseRegistrationDto.term = createCourseRegistrationFormDto.term;
    courseRegistrationDto.year = createCourseRegistrationFormDto.year;
    // Create new CourseRegistration
    const newCourseRegistration =
      await this.courseRegistrationRepository.create(courseRegistrationDto);
    // Create CourseRegistrationItem
    for (const item of createCourseRegistrationFormDto.courseRegistrationItems) {
      const createCourseRegistrationItemDto =
        new CreateCourseRegistrationItemDto();
      createCourseRegistrationItemDto.courseRegistrationId =
        newCourseRegistration[0].id;
      createCourseRegistrationItemDto.courseId = parseInt(item);
      await this.courseRegistrationRepository.createCourseRegistrationItem(
        createCourseRegistrationItemDto,
      );
    }
    return newCourseRegistration;
  }

  findAll() {
    return `This action returns all courseRegistration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} courseRegistration`;
  }

  // update(id: number, updateCourseRegistrationDto: UpdateCourseRegistrationDto) {
  //   return `This action updates a #${id} courseRegistration`;
  // }

  remove(id: number) {
    return `This action removes a #${id} courseRegistration`;
  }
}
