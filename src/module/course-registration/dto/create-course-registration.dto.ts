import { Term } from "./create-course-registration-form.dto";

export class CreateCourseRegistrationDto {
  registrationDate: string;

  year: number;

  term: Term;

  studentId: number;
}
