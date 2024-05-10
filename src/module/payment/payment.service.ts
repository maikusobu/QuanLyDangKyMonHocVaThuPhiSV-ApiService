import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "@repository/payment/payment.repository";
import { FindTuitionDto } from "./dto/find-tuition.dto";

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  findAllPayment() {
    return this.paymentRepository.findAllPayment();
  }

  findTuition(findTuitionDto: FindTuitionDto) {
    return this.paymentRepository.findTuition(findTuitionDto);
  }
}
