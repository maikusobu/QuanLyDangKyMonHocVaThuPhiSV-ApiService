import { TERM } from "@util/constants";
import { IsEnum, IsInt } from "class-validator";

export class GetAllCourseRegistrationDto {
  @IsInt()
  year: number;

  @IsEnum(TERM)
  term: TERM;
}
