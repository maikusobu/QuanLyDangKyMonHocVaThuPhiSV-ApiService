import { InsertCourseRegistration } from "@db/schema";
import { Transform } from "class-transformer";
import {
  IsArray,
  IsEnum,
  IsInt,
  IsString,
  ValidateNested,
} from "class-validator";

export enum Term {
  First = "first",
  Second = "second",
  Third = "third",
}

export class CreateCourseRegistrationFormDto
  implements Partial<InsertCourseRegistration>
{
  @IsString()
  registrationDate: string;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  year: number;

  @IsEnum(Term)
  term: Term;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  studentId: number;

  @IsArray()
  @ValidateNested({ each: true })
  // @Type(() => CreateCourseRegistrationItemDto)
  courseRegistrationItems: string[];
}
