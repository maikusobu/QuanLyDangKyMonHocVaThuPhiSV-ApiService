import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateCourseOpenDto {
  @IsNumber()
  majorId: number;

  @IsString()
  majorName: string;

  @IsString()
  stateId: string;

  @IsArray()
  courses: CourseOpen[];
}

type CourseOpen = {
  courseId: number;
  courseName: string;
  numberOfPeriods: number;
};
