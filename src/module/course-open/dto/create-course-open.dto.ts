import { TERM } from "@util/constants";
import { IsArray, IsEnum, IsInt, IsNumber } from "class-validator";

export class CreateCourseOpenDto {
  @IsNumber()
  majorId: number;

  @IsEnum(TERM)
  term: TERM;

  @IsInt()
  year: number;

  @IsArray()
  courseIds: number[];
}
