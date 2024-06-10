import { IsString } from "class-validator";

export class DeleteRegistrationDto {
  @IsString()
  courseRegistrationId: string;

  @IsString()
  stateId: string;
}
