import { IsOptional } from "class-validator";

export class FilterCourseDto {
  @IsOptional()
  search?: string;
}
