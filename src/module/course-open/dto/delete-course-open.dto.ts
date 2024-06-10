import { IsArray, IsNumber } from "class-validator";

export class DeleteCourseOpenDto {
  // @IsString()
  // openCourseId: string;

  // @IsString()
  // stateId: string;
  @IsArray()
  courses: number[];
  @IsNumber()
  availableCourseId: number;
}
