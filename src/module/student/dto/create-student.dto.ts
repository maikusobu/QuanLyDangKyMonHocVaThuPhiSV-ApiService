import { InsertStudent } from "src/db/schema";
import {
  IsNumber,
  IsEnum,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
  IsNotEmpty,
} from "class-validator";

@ValidatorConstraint({ name: "isValidDate", async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    return !isNaN(date.getTime()) && date < now;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid date string and before the current date`;
  }
}

export function IsValidDate(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsValidDateConstraint,
    });
  };
}
enum Gender {
  male = "male",
  female = "female",
}

export class CreateStudentDto implements InsertStudent {
  @IsNotEmpty({ message: "name Tên không được để trống" })
  name: string;

  @IsNotEmpty({ message: "dateOfBirth Ngày sinh không được bỏ trống" })
  @IsValidDate({
    message:
      "dateOfBirth Ngày sinh không hợp lệ, ngày sinh phải trước ngày hiện tại",
  })
  dateOfBirth: string;

  @IsNotEmpty({ message: "address Địa chỉ không được để trống" })
  address: string;

  @IsEnum(Gender, {
    message: "gender Giới tính không hợp lệ",
  })
  gender: Gender;
  @IsNotEmpty({ message: "majorId Ngành không được để trống" })
  @IsNumber()
  majorId: number;
  @IsNotEmpty({ message: "districtId Quận/Huyện không được để trống" })
  @IsNumber()
  districtId: number;
  @IsNotEmpty({ message: "priorityId Ưu tiên không được để trống" })
  @IsNumber()
  priorityId: number;
}
