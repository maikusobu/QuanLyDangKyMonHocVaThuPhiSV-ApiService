import { TERM } from "@util/constants";
import { IsEnum, IsNumber } from "class-validator";

export class DeleteRegistrationDto {
  @IsNumber()
  majorId: number;

  @IsNumber()
  year: number;

  @IsEnum(TERM)
  term: TERM;
}
