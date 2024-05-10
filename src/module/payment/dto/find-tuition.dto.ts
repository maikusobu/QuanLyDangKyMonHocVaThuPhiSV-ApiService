import { TERM } from "@util/constants";
import { IsEnum, IsInt } from "class-validator";

enum STATUS {
  PENDING = "PENDING",
  PAID = "PAID",
  ALL = "ALL",
}

export class FindTuitionDto {
  @IsInt()
  year: number;

  @IsEnum(TERM)
  term: TERM;

  @IsEnum(STATUS)
  status: STATUS;
}
