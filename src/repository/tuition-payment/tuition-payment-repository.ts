import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";

@Injectable()
export class TuitionPaymentRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}
}
