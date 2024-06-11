import { TERM } from "@util/constants";
import {
  IsCurrency,
  IsEnum,
  IsInt,
  IsNumberString,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
@ValidatorConstraint({ name: "isValidDate", async: false })
export class IsValidDateConstraint implements ValidatorConstraintInterface {
  validate(dateString: string) {
    const date = new Date(dateString);

    return !isNaN(date.getTime());
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
export class CreatePaymentDto {
  @IsValidDate()
  paymentDate: string;
  @IsCurrency()
  amount: number;
  @IsNumberString()
  studentId: number;
  @IsEnum(TERM)
  term: TERM;
  @IsInt()
  year: number;
}
