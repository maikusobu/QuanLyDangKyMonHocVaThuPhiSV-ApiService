import { IsString, IsEmail, Validate } from "class-validator";
import { PasswordValidationPipe } from "@common/pipes/password.pipe";
export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;
  @IsString()
  @Validate(PasswordValidationPipe)
  password: string;
}
