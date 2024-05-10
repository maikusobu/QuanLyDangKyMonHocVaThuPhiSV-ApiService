import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";

@Injectable()
export class PaymentRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async findAll() {
    const query = await this.drizzle.query.tuitionPayment.findMany({
      with: {
        tuition: {
          columns: {},
          with: {
            courseRegistration: {
              columns: {},
              with: {
                student: {
                  columns: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    const result = query.map((item) => {
      return {
        id: item.id,
        student: {
          id: item.tuition.courseRegistration.student.id,
          name: item.tuition.courseRegistration.student.name,
        },
        amount: item.amount,
        paymentDate: item.paymentDate,
      };
    });

    return result;
  }
}
