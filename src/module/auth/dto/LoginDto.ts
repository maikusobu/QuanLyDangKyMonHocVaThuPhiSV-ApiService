import { IsString, IsEmail, Min } from "class-validator";

export class LoginDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Min(8)
  password: string;
}
