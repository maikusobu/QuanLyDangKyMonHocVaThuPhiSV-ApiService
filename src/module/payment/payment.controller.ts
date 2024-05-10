import { Controller, Get, Query } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { END_POINTS } from "@util/constants";
import { FindTuitionDto } from "./dto/find-tuition.dto";

@Controller(END_POINTS.PAYMENT.BASE)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(END_POINTS.PAYMENT.GET_PAYMENT)
  async findAllPayment() {
    return await this.paymentService.findAllPayment();
  }

  @Get(END_POINTS.PAYMENT.GET_TUITION)
  async findTuition(@Query() findTuitionDto: FindTuitionDto) {
    return await this.paymentService.findTuition(findTuitionDto);
  }
}
