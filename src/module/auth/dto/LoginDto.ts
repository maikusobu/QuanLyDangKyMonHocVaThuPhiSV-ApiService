import { IsString, IsEmail, Min, Validate } from "class-validator";
import { PasswordValidationPipe } from "@common/pipes/validation.pipe";
export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @Min(8)
  @Validate(PasswordValidationPipe)
  password: string;
}
