import { Injectable } from "@nestjs/common";
import { PaymentRepository } from "@repository/payment/payment.repository";
import { FindTuitionDto } from "./dto/find-tuition.dto";
import { FindPaymentDto } from "./dto/find-payment.dto";
import { GetStudentTuitionDetailDto } from "./dto/get-student-tuition-detail.dto";
import { CreatePaymentDto } from "./dto/create-payment-dto";

@Injectable()
export class PaymentService {
  constructor(private paymentRepository: PaymentRepository) {}

  findPayment(findPaymentDto: FindPaymentDto) {
    return this.paymentRepository.findPayment(findPaymentDto);
  }
  createPayment(createPaymentDto: CreatePaymentDto) {
    return this.paymentRepository.createPayment(createPaymentDto);
  }

  findTuition(findTuitionDto: FindTuitionDto) {
    return this.paymentRepository.findTuition(findTuitionDto);
  }
  getStudentTuitionDetail(
    getStudentTuitionDetailDto: GetStudentTuitionDetailDto,
  ) {
    return this.paymentRepository.getStudentTuitionDetail(
      getStudentTuitionDetailDto,
    );
  }
}
