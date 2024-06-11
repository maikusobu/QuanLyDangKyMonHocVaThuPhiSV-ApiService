import { TERM } from "@util/constants";
import { IsEnum, IsInt } from "class-validator";

export class GetStudentTuitionDetailDto {
  @IsInt()
  year: number;
  @IsEnum(TERM)
  term: TERM;
  @IsInt()
  studentId: number;
}
