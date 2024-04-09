import { IsInt, IsString, Length, Min } from "class-validator";
import { InsertCourse } from "src/db/schema";

export class CreateCourseDto implements InsertCourse {
  @Length(1, 100)
  @IsString()
  name: string;

  @Min(1)
  @IsInt()
  numberOfPeriods: number;

  @IsInt()
  courseTypeId: number;

  @IsInt()
  facultyId: number;
}
