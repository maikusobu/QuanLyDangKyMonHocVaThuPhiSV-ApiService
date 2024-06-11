import { IsInt } from "class-validator";

export class CreatePaymentDto {
  @IsInt()
  tuitionId: number;
  @IsInt()
  amount: number;
}
