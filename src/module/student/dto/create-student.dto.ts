import { InsertStudent } from "src/db/schema";
import {
  IsString,
  IsNumber,
  IsEnum,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationOptions,
} from "class-validator";

@ValidatorConstraint({ name: "isValidDate", async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(dateString: string) {
    return !isNaN(Date.parse(dateString));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid date string`;
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
  @IsString({ message: "name Tên không được để trống" })
  name: string;

  @IsString({ message: "dateOfBirth Ngày sinh không được bỏ trống" })
  @IsValidDate({ message: "dateOfBirth Ngày sinh không hợp lệ" })
  dateOfBirth: string;

  @IsString({ message: "address Địa chỉ không được để trống" })
  address: string;

  @IsEnum(Gender, {
    message: "gender Giới tính không hợp lệ",
  })
  gender: Gender;

  @IsNumber()
  majorId: number;

  @IsNumber()
  districtId: number;

  @IsNumber()
  priorityId: number;
}
