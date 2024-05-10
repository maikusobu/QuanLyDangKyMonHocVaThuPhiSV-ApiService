import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "@repository/payment/payment.repository";

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  findAll() {
    return this.paymentRepository.findAll();
  }
}
