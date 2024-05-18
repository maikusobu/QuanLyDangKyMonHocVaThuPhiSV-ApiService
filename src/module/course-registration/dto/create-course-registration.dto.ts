import { TERM } from "@util/constants";

export class CreateCourseRegistrationDto {
  registrationDate: string;

  year: number;

  term: TERM;

  studentId: number;
}
