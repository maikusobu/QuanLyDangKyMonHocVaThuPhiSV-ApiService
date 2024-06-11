import {
  course,
  courseRegistration,
  courseRegistrationItem,
  major,
  student,
} from "@db/schema";
import { CreateCourseRegistrationItemDto } from "@module/course-registration/dto/create-course-registration-item-dto";
import { CreateCourseRegistrationDto } from "@module/course-registration/dto/create-course-registration.dto";
import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { TERM } from "@util/constants";
import { and, eq, inArray } from "drizzle-orm";
import { HttpService } from "@nestjs/axios";
import { ConfigService } from "@nestjs/config";
import { resolveTerm, reverseTerm } from "./helper/resolveTerm";
import { firstValueFrom } from "rxjs";
import { CloseCurrentStateDto } from "@module/course-registration/dto/close-current-state.dto";
import { DeleteRegistrationDto } from "@module/course-registration/dto/delete-registration.dto";
@Injectable()
export class CourseRegistrationRepository {
  constructor(
    @Inject("DRIZZLE") private drizzle: Drizzle,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}
  private taskStatuses = new Map<string, "running" | "completed">();

  async findAllOneTerm(term: TERM, year: number) {
    const courseOpenState = await this.drizzle.query.availableCourse.findFirst({
      where: and(
        eq(courseRegistration.term, term),
        eq(courseRegistration.year, year),
      ),
    });

    if (!courseOpenState || !courseOpenState.available) {
      return new HttpException(
        "Course registration is not available, please check course-open state",
        400,
      );
    }

    const termResolved = resolveTerm(term);
    const url = this.configService.get<string>("service");
    // console.log(url);
    const { data: stateData } = await firstValueFrom(
      this.httpService.get(
        `${url}/registration_state?term=${termResolved}&year=${year}`,
      ),
    );

    const stateId = stateData._id;
    // console.log("stateID: ", stateId);

    const { data: registrationsData } = await firstValueFrom(
      this.httpService.get(`${url}/course_registration?stateId=${stateId}`),
    );

    const registrations = await Promise.all(
      registrationsData.map(async (registration: any) => {
        const { majorId, courses, _id } = registration;
        console.log(majorId, courses, _id);
        const majorDataPromise = this.drizzle.query.major.findFirst({
          where: eq(major.id, majorId),
        });

        const coursesPromise = this.drizzle.query.course.findMany({
          where: inArray(course.id, courses),
          columns: {
            courseTypeId: false,
            facultyId: false,
          },
          with: {
            courseType: true,
            faculty: true,
          },
        });

        const [majorData, coursesData] = await Promise.all([
          majorDataPromise,
          coursesPromise,
        ]);

        return {
          _id,
          major: majorData,
          courses: coursesData,
        };
      }),
    );

    const result = {
      available: stateData.available,
      stateId: stateData._id,
      registrations,
    };

    return result;
  }

  async create(createCourseRegistrationDto: CreateCourseRegistrationDto) {
    const url = this.configService.get<string>("service");
    const { data: stateData } = await firstValueFrom(
      this.httpService.get(
        `${url}/registration_state?stateId=${createCourseRegistrationDto.stateId}`,
      ),
    );

    if (!stateData || !stateData.available) {
      return new HttpException(
        "State does not available for registration",
        400,
      );
    }

    const insertData = {
      stateId: createCourseRegistrationDto.stateId,
      majorId: createCourseRegistrationDto.majorId,
      courses: [],
    };

    for (const course of createCourseRegistrationDto.courses) {
      insertData.courses.push(course);
    }

    const { data: insertedId } = await firstValueFrom(
      this.httpService.post(`${url}/course_registration`, insertData),
    );

    // Register students in background
    this.registerStudentsInBackground(
      createCourseRegistrationDto,
      stateData,
      insertedId,
    ).catch((error) => {
      console.error("Failed to register students in background:", error);
    });

    return insertedId;
  }

  async closeCurrentState(closeCurrentStateDto: CloseCurrentStateDto) {
    const url = this.configService.get<string>("service");
    const { data } = await firstValueFrom(
      this.httpService.patch(
        `${url}/registration_state?term=${resolveTerm(closeCurrentStateDto.term)}&year=${closeCurrentStateDto.year}`,
      ),
    );

    return data;
  }

  async remove(deleteRegistrationDto: DeleteRegistrationDto) {
    // check if the backgroud task for course registration is running, if not, proceed with deletion
    if (
      this.taskStatuses.get(
        `registration-${deleteRegistrationDto.courseRegistrationId}`,
      ) === "running"
    ) {
      return new HttpException(
        "Cannot delete while registration is in progress",
        400,
      );
    }

    const url = this.configService.get<string>("service");
    // get state
    const { data: stateData } = await firstValueFrom(
      this.httpService.get(
        `${url}/registration_state?stateId=${deleteRegistrationDto.stateId}`,
      ),
    );

    if (!stateData || !stateData.available) {
      return new HttpException("State does not available for deletion", 400);
    }

    const { data: registrationData } = await firstValueFrom(
      this.httpService.get(
        `${url}/course_registration?id=${deleteRegistrationDto.courseRegistrationId}`,
      ),
    );

    const { data } = await firstValueFrom(
      this.httpService.delete(
        `${url}/course_registration?id=${deleteRegistrationDto.courseRegistrationId}`,
      ),
    );

    //background task to delete course registration and items
    this.deleteCourseRegistrationInBackground(
      registrationData.majorId,
      reverseTerm(stateData.term),
      stateData.year,
    ).catch((error) => {
      console.error(
        "Failed to delete course registration in background:",
        error,
      );
    });
    return data;
  }

  async createCourseRegistrationItem(
    createCourseRegistrationItemDto: CreateCourseRegistrationItemDto,
  ) {
    return await this.drizzle
      .insert(courseRegistrationItem)
      .values(createCourseRegistrationItemDto)
      .returning();
  }

  async findAllWithMajorId(majorId: number, year: number, term: TERM) {
    return await this.drizzle.query.courseRegistration.findMany({
      where: and(
        eq(courseRegistration.year, year),
        eq(courseRegistration.term, term),
        eq(student.majorId, majorId),
      ),
      with: {
        student: {
          columns: {},
        },
      },
    });
  }

  async deleteAllCourseRegistrationItem(courseRegistrationId: number) {
    return await this.drizzle
      .delete(courseRegistrationItem)
      .where(
        eq(courseRegistrationItem.courseRegistrationId, courseRegistrationId),
      )
      .returning();
  }

  // Background task for registering students
  private async registerStudentsInBackground(
    createCourseRegistrationDto: CreateCourseRegistrationDto,
    stateData: any,
    insertedId: any,
  ) {
    const taskId = `registration-${insertedId}`;
    this.taskStatuses.set(taskId, "running");

    try {
      const students = await this.drizzle.query.student.findMany({
        where: eq(student.majorId, createCourseRegistrationDto.majorId),
      });

      const registrations = students.map((student) => ({
        term: reverseTerm(stateData.term),
        year: stateData.year,
        registrationDate: new Date().toDateString(),
        studentId: student.id,
      }));

      const insertedRegistrations = await this.drizzle
        .insert(courseRegistration)
        .values(registrations)
        .returning();

      const registrationItems = [];
      insertedRegistrations.forEach((registration) => {
        createCourseRegistrationDto.courses.forEach((courseRegistration) => {
          registrationItems.push({
            courseRegistrationId: registration.id,
            courseId: courseRegistration,
          });
        });
      });

      await this.drizzle
        .insert(courseRegistrationItem)
        .values(registrationItems)
        .returning();

      this.taskStatuses.set(taskId, "completed");
    } catch (error) {
      console.error("Failed to register students in background:", error);
      this.taskStatuses.set(taskId, "completed"); // consider handling errors differently
    } finally {
      console.log("Registered students in background");
    }
  }

  async findAll(year: number, term: TERM) {
    const registration = await this.drizzle.query.courseRegistration.findMany({
      where: and(
        eq(courseRegistration.year, year),
        eq(courseRegistration.term, term),
      ),
      columns: {
        studentId: false,
      },
      with: {
        student: {
          columns: {
            id: true,
            name: true,
          },
        },
      },
    });
    return registration;
  }

  private async deleteCourseRegistrationInBackground(
    majorId: number,
    term: TERM,
    year: number,
  ) {
    try {
      const registrations =
        await this.drizzle.query.courseRegistration.findMany({
          where: and(
            eq(courseRegistration.term, term),
            eq(courseRegistration.year, year),
          ),
        });

      const registrationIds = registrations.map(
        (registration) => registration.id,
      );
      await this.drizzle
        .delete(courseRegistrationItem)
        .where(
          inArray(courseRegistrationItem.courseRegistrationId, registrationIds),
        );
      await this.drizzle
        .delete(courseRegistration)
        .where(inArray(courseRegistration.id, registrationIds));
    } catch (error) {
      console.error(
        "Failed to delete course registration in background:",
        error,
      );
    } finally {
      console.log("Deleted course registration in background");
    }
  }
}
