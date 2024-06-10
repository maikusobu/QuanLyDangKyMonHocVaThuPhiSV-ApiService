import { IsArray, IsNumber, IsString } from "class-validator";

export class CreateCourseRegistrationDto {
  @IsNumber()
  majorId: number;

  @IsString()
  stateId: string;

  @IsArray()
  courses: number[];
}
