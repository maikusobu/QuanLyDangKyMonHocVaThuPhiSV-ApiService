import { Injectable } from "@nestjs/common";
import { CreateCourseRegistrationFormDto } from "./dto/create-course-registration-form.dto";
import { CourseRegistrationRepository } from "@repository/course-registration/course-registration.repository";
import { CreateCourseRegistrationDto } from "./dto/create-course-registration.dto";
import { CreateCourseRegistrationItemDto } from "./dto/create-course-registration-item-dto";
import { TuitionRepository } from "@repository/tuition/tuition.repository";

@Injectable()
export class CourseRegistrationService {
  constructor(
    private readonly courseRegistrationRepository: CourseRegistrationRepository,
    private readonly tuitionRepository: TuitionRepository,
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
    // Background task to compute course registration fee
    this.computeTuition(newCourseRegistration[0].id).catch((err) => {
      console.error("Error computing tuition:", err);
    });

    return newCourseRegistration[0];
  }

  findAll() {
    return this.courseRegistrationRepository.findAll();
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

  private async computeTuition(courseRegistrationId: number) {
    console.log("Computing tuition for registration ID:", courseRegistrationId);
    // simulate long computation
    await this.tuitionRepository.computeTuition(courseRegistrationId);
    console.log("Tuition computed");
  }
}
