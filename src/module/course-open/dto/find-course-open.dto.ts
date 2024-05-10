import { TERM } from "@util/constants";
import { IsEnum, IsInt } from "class-validator";

export class FindCourseOpenDto {
  @IsEnum(TERM)
  term: TERM;

  @IsInt()
  year: number;
}
