import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { END_POINTS } from "@util/constants";
import { FindTuitionDto } from "./dto/find-tuition.dto";
import { FindPaymentDto } from "./dto/find-payment.dto";
import { GetStudentTuitionDetailDto } from "./dto/get-student-tuition-detail.dto";
import { CreatePaymentDto } from "./dto/create-payment-dto";

@Controller(END_POINTS.PAYMENT.BASE)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(END_POINTS.PAYMENT.GET_PAYMENT)
  async findPayment(@Query() findPaymentDto: FindPaymentDto) {
    return await this.paymentService.findPayment(findPaymentDto);
  }

  @Get(END_POINTS.PAYMENT.GET_TUITION)
  async findTuition(@Query() findTuitionDto: FindTuitionDto) {
    return await this.paymentService.findTuition(findTuitionDto);
  }

  @Get(END_POINTS.PAYMENT.GET_MINE)
  async getStudentTuitionDetail(
    @Query() getStudentTuitionDetailDto: GetStudentTuitionDetailDto,
  ) {
    return await this.paymentService.getStudentTuitionDetail(
      getStudentTuitionDetailDto,
    );
  }

  @Post(END_POINTS.PAYMENT.CREATE)
  async createPayment(@Body() createPaymentDto: CreatePaymentDto) {
    return await this.paymentService.createPayment(createPaymentDto);
  }
}
