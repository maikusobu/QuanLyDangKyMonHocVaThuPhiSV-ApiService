import { IsInt } from "class-validator";

export class CloseCurrentStateDto {
  @IsInt()
  availableCourseId: number;
}
