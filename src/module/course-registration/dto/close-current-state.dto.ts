import { TERM } from "@util/constants";
import { IsEnum, IsNumber } from "class-validator";

export class CloseCurrentStateDto {
  @IsEnum(TERM)
  term: TERM;
  @IsNumber()
  year: number;
}
