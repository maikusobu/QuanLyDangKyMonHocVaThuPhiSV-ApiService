import { IsInt } from "class-validator";

export class DeleteCourseOpenDto {
  @IsInt()
  courseId: number;

  @IsInt()
  availableCourseId: number;
}
