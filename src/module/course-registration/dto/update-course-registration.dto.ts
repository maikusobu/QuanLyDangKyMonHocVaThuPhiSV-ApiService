import { PartialType } from "@nestjs/mapped-types";
import { CreateCourseRegistrationFormDto } from "./create-course-registration-form.dto";

export class UpdateCourseRegistrationDto extends PartialType(
  CreateCourseRegistrationFormDto,
) {}
