import { TERM } from "@util/constants";
import { IsEnum, IsInt, IsOptional } from "class-validator";

export class FindPaymentDto {
  @IsInt()
  year: number;

  @IsEnum(TERM)
  term: TERM;

  @IsOptional()
  studentName?: string;
}
