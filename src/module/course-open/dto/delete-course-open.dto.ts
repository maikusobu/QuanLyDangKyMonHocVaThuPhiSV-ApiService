import { IsString } from "class-validator";

export class DeleteCourseOpenDto {
  @IsString()
  openCourseId: string;

  @IsString()
  stateId: string;
}
