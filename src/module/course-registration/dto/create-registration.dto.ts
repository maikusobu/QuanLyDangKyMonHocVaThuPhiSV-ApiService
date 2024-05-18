import { TERM } from "@util/constants";
import { IsArray, IsEnum, IsNumber, IsString } from "class-validator";

export class CreateRegistrationDto {
  @IsString()
  registrationDate: string;

  @IsNumber()
  year: number;

  @IsEnum(TERM)
  term: TERM;

  @IsNumber()
  majorId: number;

  @IsArray()
  courses: string[];
}
