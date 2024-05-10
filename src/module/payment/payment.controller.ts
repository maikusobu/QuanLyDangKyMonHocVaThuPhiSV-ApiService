import { Controller, Get } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { END_POINTS } from "@util/constants";

@Controller(END_POINTS.PAYMENT.BASE)
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Get(END_POINTS.PAYMENT.GET_ALL)
  async getAll() {
    return await this.paymentService.findAll();
  }
}
