import { Injectable } from "@nestjs/common";
import { CourseRegistrationRepository } from "@repository/course-registration/course-registration.repository";
import { CreateCourseRegistrationDto } from "./dto/create-course-registration.dto";
import { CreateCourseRegistrationItemDto } from "./dto/create-course-registration-item-dto";
import { TuitionRepository } from "@repository/tuition/tuition.repository";
import { GetAllCourseRegistrationDto } from "./dto/get-all-course-registration.dto";
import { TERM } from "@util/constants";
import { CreateRegistrationDto } from "./dto/create-registration.dto";
import { StudentRepository } from "@repository/student/student.repository";
import { DeleteRegistrationDto } from "./dto/delete-registration.dto";

@Injectable()
export class CourseRegistrationService {
  constructor(
    private readonly courseRegistrationRepository: CourseRegistrationRepository,
    private readonly tuitionRepository: TuitionRepository,
    private readonly studentRepository: StudentRepository,
  ) {}

  // async create(
  //   createCourseRegistrationFormDto: CreateCourseRegistrationFormDto,
  // ) {
  //   // Map form into DTO
  //   const courseRegistrationDto = new CreateCourseRegistrationDto();
  //   courseRegistrationDto.registrationDate =
  //     createCourseRegistrationFormDto.registrationDate;
  //   courseRegistrationDto.studentId = createCourseRegistrationFormDto.studentId;
  //   courseRegistrationDto.term = createCourseRegistrationFormDto.term;
  //   courseRegistrationDto.year = createCourseRegistrationFormDto.year;
  //   // Create new CourseRegistration
  //   const newCourseRegistration =
  //     await this.courseRegistrationRepository.create(courseRegistrationDto);
  //   // Create CourseRegistrationItem
  //   for (const item of createCourseRegistrationFormDto.courseRegistrationItems) {
  //     const createCourseRegistrationItemDto =
  //       new CreateCourseRegistrationItemDto();
  //     createCourseRegistrationItemDto.courseRegistrationId =
  //       newCourseRegistration[0].id;
  //     createCourseRegistrationItemDto.courseId = parseInt(item);
  //     await this.courseRegistrationRepository.createCourseRegistrationItem(
  //       createCourseRegistrationItemDto,
  //     );
  //   }
  //   // Background task to compute course registration fee
  //   this.computeTuition(newCourseRegistration[0].id).catch((err) => {
  //     console.error("Error computing tuition:", err);
  //   });

  //   return newCourseRegistration[0];
  // }

  async create(createRegistrationDto: CreateRegistrationDto) {
    // 1. Find all student with majorId
    const students = await this.studentRepository.findStudentByMajorId(
      createRegistrationDto.majorId,
    );
    // 2. Create new CourseRegistration for each student
    const courseRegistrationPromises = students.map(async (student) => {
      const courseRegistrationDto = new CreateCourseRegistrationDto();
      courseRegistrationDto.registrationDate =
        createRegistrationDto.registrationDate;
      courseRegistrationDto.studentId = student.id;
      courseRegistrationDto.term = createRegistrationDto.term;
      courseRegistrationDto.year = createRegistrationDto.year;
      const newCourseRegistration =
        await this.courseRegistrationRepository.create(courseRegistrationDto);
      // 3. Create CourseRegistrationItem for each CourseRegistration
      const courseRegistrationItemPromises = createRegistrationDto.courses.map(
        async (courseId) => {
          const createCourseRegistrationItemDto =
            new CreateCourseRegistrationItemDto();
          createCourseRegistrationItemDto.courseRegistrationId =
            newCourseRegistration[0].id;
          createCourseRegistrationItemDto.courseId = parseInt(courseId);
          await this.courseRegistrationRepository.createCourseRegistrationItem(
            createCourseRegistrationItemDto,
          );
        },
      );
      await Promise.all(courseRegistrationItemPromises);
      // 4. Background task to compute course registration fee for every student
      this.computeTuition(newCourseRegistration[0].id).catch((err) => {
        console.error("Error computing tuition:", err);
      });
      return newCourseRegistration[0];
    });
    const newCourseRegistrations = await Promise.all(
      courseRegistrationPromises,
    );
    return newCourseRegistrations;
  }

  findAll(getAllCourseRegistrationDto: GetAllCourseRegistrationDto) {
    return this.courseRegistrationRepository.findAll(
      getAllCourseRegistrationDto.year,
      getAllCourseRegistrationDto.term,
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} courseRegistration`;
  }

  // update(id: number, updateCourseRegistrationDto: UpdateCourseRegistrationDto) {
  //   return `This action updates a #${id} courseRegistration`;
  // }

  async remove(deleteRegistrationDto: DeleteRegistrationDto) {
    // 1. Find all CourseRegistration with majorId, year, term
    const courseRegistrations =
      await this.courseRegistrationRepository.findAllWithMajorId(
        deleteRegistrationDto.majorId,
        deleteRegistrationDto.year,
        deleteRegistrationDto.term,
      );
    // 2. Delete all CourseRegistrationItem of each CourseRegistration
    const courseRegistrationItemPromises = courseRegistrations.map(
      async (courseRegistration) => {
        await this.courseRegistrationRepository.deleteAllCourseRegistrationItem(
          courseRegistration.id,
        );
      },
    );

    await Promise.all(courseRegistrationItemPromises);
    // 3. Recalculate all Tuition of each CourseRegistration
    const tuitionPromises = courseRegistrations.map((courseRegistration) => {
      return this.computeTuition(courseRegistration.id);
    });

    await Promise.all(tuitionPromises);
  }

  async findCurrent(term: TERM, year: number) {
    return this.courseRegistrationRepository.findCurrentRegistrationDeparment(
      term,
      year,
    );
  }

  private async computeTuition(courseRegistrationId: number) {
    console.log("Computing tuition for registration ID:", courseRegistrationId);
    // simulate long computation
    await this.tuitionRepository.computeTuition(courseRegistrationId);
    console.log("Tuition computed");
  }
}
