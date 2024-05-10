import { PipeTransform, Injectable, BadRequestException } from "@nestjs/common";

@Injectable()
export class PasswordValidationPipe implements PipeTransform {
  transform(value: any) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (!passwordRegex.test(value)) {
      throw new BadRequestException(
        "Password must have at least 8 characters with at least one uppercase letter, one lowercase letter, and one digit",
      );
    }
    return value;
  }
}
