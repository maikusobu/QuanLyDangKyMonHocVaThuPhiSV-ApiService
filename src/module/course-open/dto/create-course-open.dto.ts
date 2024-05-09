import { TERM } from "@util/constants";
import { IsEnum, IsInt } from "class-validator";

export class CreateCourseOpenDto {
  @IsInt()
  courseId: number;

  @IsEnum(TERM)
  term: TERM;

  @IsInt()
  year: number;
}
