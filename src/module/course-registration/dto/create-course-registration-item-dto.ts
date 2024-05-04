import { InsertCourseRegistrationItem } from "@db/schema";
import { IsInt } from "class-validator";

export class CreateCourseRegistrationItemDto
  implements InsertCourseRegistrationItem
{
  @IsInt()
  courseRegistrationId: number;
  @IsInt()
  courseId: number;
}
