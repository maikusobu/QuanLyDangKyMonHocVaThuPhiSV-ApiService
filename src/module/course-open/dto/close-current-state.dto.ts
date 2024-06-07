import { TERM } from "@util/constants";
import { IsEnum, IsInt } from "class-validator";

export class CloseCurrentStateDto {
  @IsEnum(TERM)
  term: TERM;

  @IsInt()
  year: number;
}
