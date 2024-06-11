import {
  availableCourse,
  availableCourseItem,
  InsertAvailableCourseItem,
} from "@db/schema";
import { CloseCurrentStateDto } from "@module/course-open/dto/close-current-state.dto";
import { CreateCourseOpenDto } from "@module/course-open/dto/create-course-open.dto";
import { DeleteCourseOpenDto } from "@module/course-open/dto/delete-course-open.dto";
import { HttpException, Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { TERM } from "@util/constants";
import { and, eq, inArray } from "drizzle-orm";

@Injectable()
export class CourseOpenRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async closeCurrentState(closeCurrentStateDto: CloseCurrentStateDto) {
    const res = await this.drizzle
      .update(availableCourse)
      .set({ available: false })
      .where(eq(availableCourse.id, closeCurrentStateDto.availableCourseId))
      .returning();
    return res[0];
  }

  async create(createCourseOpenDto: CreateCourseOpenDto) {
    const checkState = await this.drizzle.query.availableCourse.findFirst({
      where: eq(availableCourse.id, createCourseOpenDto.availableCourseId),
    });

    if (!checkState || !checkState.available) {
      return new HttpException(
        "State does not available for course open!",
        400,
      );
    }

    const data = [];
    for (const courseId of createCourseOpenDto.courses) {
      data.push({
        courseId,
        availableCourseId: createCourseOpenDto.availableCourseId,
      });
    }

    const res = await this.drizzle
      .insert(availableCourseItem)
      .values(data)
      .onConflictDoNothing()
      .returning();

    return res;
  }

  async delete(deleteCourseOpenDto: DeleteCourseOpenDto) {
    const checkState = await this.drizzle.query.availableCourse.findFirst({
      where: eq(availableCourse.id, deleteCourseOpenDto.availableCourseId),
    });

    if (!checkState || !checkState.available) {
      return new HttpException(
        "State does not available for course open!",
        400,
      );
    }

    const res = await this.drizzle
      .delete(availableCourseItem)
      .where(
        and(
          inArray(availableCourseItem.courseId, deleteCourseOpenDto.courses),
          eq(
            availableCourseItem.availableCourseId,
            deleteCourseOpenDto.availableCourseId,
          ),
        ),
      )
      .returning();

    return res;
  }

  async findAllOneTerm(term: TERM, year: number) {
    let currentTerm = await this.drizzle.query.availableCourse.findFirst({
      where: and(
        eq(availableCourse.term, term),
        eq(availableCourse.year, year),
      ),
    });

    if (!currentTerm) {
      const test = await this.drizzle
        .insert(availableCourse)
        .values({ term: term, year: year, available: true })
        .returning();
      currentTerm = test[0];

      return {
        availableCourseId: currentTerm.id,
        available: currentTerm.available,
        availableCourses: [],
      };
    }

    // get all available courses for the term
    const availableCourses =
      await this.drizzle.query.availableCourseItem.findMany({
        where: eq(availableCourseItem.availableCourseId, currentTerm.id),
        columns: {},
        with: {
          course: {
            columns: {
              facultyId: false,
              courseTypeId: false,
            },
            with: {
              faculty: true,
              courseType: true,
            },
          },
        },
      });

    return {
      availableCourseId: currentTerm.id,
      available: currentTerm.available,
      availableCourses,
    };
  }

  async createCourseOpen(item: InsertAvailableCourseItem) {
    // check if courseId exists
    const checkForCourseExistence =
      await this.drizzle.query.availableCourseItem.findFirst({
        where: and(
          eq(availableCourseItem.courseId, item.courseId),
          eq(availableCourseItem.availableCourseId, item.availableCourseId),
        ),
      });

    if (checkForCourseExistence) {
      return new HttpException("Course already exists", 400);
    }
    const courseOpen = await this.drizzle
      .insert(availableCourseItem)
      .values(item)
      .returning();

    return courseOpen[0];
  }
  // private taskStatuses = new Map<string, "running" | "completed">();

  // async closeCurrentState(closeCurrentStateDto: CloseCurrentStateDto) {
  //   const url = this.configService.get<string>("service");
  //   const { data } = await firstValueFrom(
  //     this.httpService.patch(
  //       `${url}/registration_state?term=${resolveTerm(closeCurrentStateDto.term)}&year=${closeCurrentStateDto.year}`,
  //     ),
  //   );

  //   return data;
  // }
  // private async deleteCourseRegistrationInBackground(
  //   majorId: number,
  //   term: TERM,
  //   year: number,
  // ) {
  //   try {
  //     const registrations =
  //       await this.drizzle.query.courseRegistration.findMany({
  //         where: and(
  //           eq(courseRegistration.term, term),
  //           eq(courseRegistration.year, year),
  //         ),
  //       });

  //     const registrationIds = registrations.map(
  //       (registration) => registration.id,
  //     );
  //     await this.drizzle
  //       .delete(courseRegistrationItem)
  //       .where(
  //         inArray(courseRegistrationItem.courseRegistrationId, registrationIds),
  //       );
  //     await this.drizzle
  //       .delete(courseRegistration)
  //       .where(inArray(courseRegistration.id, registrationIds));
  //   } catch (error) {
  //     console.error(
  //       "Failed to delete course registration in background:",
  //       error,
  //     );
  //   } finally {
  //     console.log("Deleted course registration in background");
  //   }
  // }

  // Background task for registering students
  // private async registerStudentsInBackground(
  //   createCourseOpenDto: CreateCourseOpenDto,
  //   stateData: any,
  // ) {
  //   const taskId = `registration-${createCourseOpenDto.stateId}`;
  //   this.taskStatuses.set(taskId, "running");

  //   try {
  //     const students = await this.drizzle.query.student.findMany({
  //       where: eq(student.majorId, createCourseOpenDto.majorId),
  //     });

  //     const registrations = students.map((student) => ({
  //       term: reverseTerm(stateData.term),
  //       year: stateData.year,
  //       registrationDate: new Date().toDateString(),
  //       studentId: student.id,
  //     }));

  //     const insertedRegistrations = await this.drizzle
  //       .insert(courseRegistration)
  //       .values(registrations)
  //       .returning();

  //     const registrationItems = [];
  //     insertedRegistrations.forEach((registration) => {
  //       createCourseOpenDto.courses.forEach((courseOpen) => {
  //         registrationItems.push({
  //           courseRegistrationId: registration.id,
  //           courseId: courseOpen.courseId,
  //         });
  //       });
  //     });

  //     await this.drizzle
  //       .insert(courseRegistrationItem)
  //       .values(registrationItems)
  //       .returning();

  //     this.taskStatuses.set(taskId, "completed");
  //   } catch (error) {
  //     console.error("Failed to register students in background:", error);
  //     this.taskStatuses.set(taskId, "completed"); // consider handling errors differently
  //   } finally {
  //     console.log("Registered students in background");
  //   }
  // }

  // async delete(deleteCourseOpenDto: DeleteCourseOpenDto) {
  //   // check if the backgroud task for course registration is running, if not, proceed with deletion
  //   if (
  //     this.taskStatuses.get(
  //       `registration-${deleteCourseOpenDto.openCourseId}`,
  //     ) === "running"
  //   ) {
  //     return new HttpException(
  //       "Cannot delete while registration is in progress",
  //       400,
  //     );
  //   }

  //   const url = this.configService.get<string>("service");
  //   // get state
  //   const { data: stateData } = await firstValueFrom(
  //     this.httpService.get(
  //       `${url}/registration_state?stateId=${deleteCourseOpenDto.stateId}`,
  //     ),
  //   );

  //   if (!stateData || !stateData.available) {
  //     return new HttpException("State does not available for deletion", 400);
  //   }

  //   const { data: openCourseData } = await firstValueFrom(
  //     this.httpService.get(
  //       `${url}/open_course?id=${deleteCourseOpenDto.openCourseId}`,
  //     ),
  //   );

  //   const { data } = await firstValueFrom(
  //     this.httpService.delete(
  //       `${url}/open_course?id=${deleteCourseOpenDto.openCourseId}`,
  //     ),
  //   );

  //   //background task to delete course registration and items
  //   this.deleteCourseRegistrationInBackground(
  //     openCourseData.major.majorId,
  //     reverseTerm(stateData.term),
  //     stateData.year,
  //   ).catch((error) => {
  //     console.error(
  //       "Failed to delete course registration in background:",
  //       error,
  //     );
  //   });
  //   return data;
  // }
}
