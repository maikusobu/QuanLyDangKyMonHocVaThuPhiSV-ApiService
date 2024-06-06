import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "@repository/payment/payment.repository";
import { FindTuitionDto } from "./dto/find-tuition.dto";
import { FindPaymentDto } from "./dto/find-payment.dto";

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  findPayment(findPaymentDto: FindPaymentDto) {
    return this.paymentRepository.findPayment(findPaymentDto);
  }

  findTuition(findTuitionDto: FindTuitionDto) {
    return this.paymentRepository.findTuition(findTuitionDto);
  }
}
