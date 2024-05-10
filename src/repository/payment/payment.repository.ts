import {
  courseRegistration,
  student,
  tuition,
  tuitionPayment,
} from "@db/schema";
import { FindTuitionDto } from "@module/payment/dto/find-tuition.dto";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { and, eq, gte, sql, sum } from "drizzle-orm";

@Injectable()
export class PaymentRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async findAllPayment() {
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

  async findTuition(findTuitionDto: FindTuitionDto) {
    if (findTuitionDto.status === "ALL") {
      return await this.findAllTuition(findTuitionDto);
    } else if (findTuitionDto.status === "PAID") {
      return await this.findPaidTuition(findTuitionDto);
    } else if (findTuitionDto.status === "PENDING") {
      return await this.findPendingTuition(findTuitionDto);
    }
  }

  async findAllTuition(findTuitionDto: FindTuitionDto) {
    const result = await this.drizzle
      .select({
        totalPaid: sum(tuitionPayment.amount),
        studentId: student.id,
        studentName: student.name,
        totalRegister: tuition.totalRegisterAmount,
        totalActual: tuition.totalActualAmount,
      })
      .from(student)
      .leftJoin(
        courseRegistration,
        eq(student.id, courseRegistration.studentId),
      )
      .leftJoin(
        tuition,
        eq(courseRegistration.id, tuition.courseRegistrationId),
      )
      .leftJoin(tuitionPayment, eq(tuition.id, tuitionPayment.tuitionId))
      .where(
        and(
          eq(courseRegistration.year, findTuitionDto.year),
          eq(courseRegistration.term, findTuitionDto.term),
        ),
      )
      .groupBy(student.id);

    return result;
  }

  async findPaidTuition(findTuitionDto: FindTuitionDto) {
    const result = await this.drizzle
      .select({
        totalPaid: sum(tuitionPayment.amount),
        studentId: student.id,
        studentName: student.name,
        totalRegister: tuition.totalRegisterAmount,
        totalActual: tuition.totalActualAmount,
      })
      .from(student)
      .leftJoin(
        courseRegistration,
        eq(student.id, courseRegistration.studentId),
      )
      .leftJoin(
        tuition,
        eq(courseRegistration.id, tuition.courseRegistrationId),
      )
      .leftJoin(tuitionPayment, eq(tuition.id, tuitionPayment.tuitionId))
      .where(
        and(
          eq(courseRegistration.year, findTuitionDto.year),
          eq(courseRegistration.term, findTuitionDto.term),
        ),
      )
      .groupBy(student.id)
      .having(({ totalPaid }) => gte(totalPaid, tuition.totalActualAmount));

    return result;
  }

  async findPendingTuition(findTuitionDto: FindTuitionDto) {
    const result = await this.drizzle
      .select({
        totalPaid: sum(tuitionPayment.amount),
        studentId: student.id,
        studentName: student.name,
        totalRegister: tuition.totalRegisterAmount,
        totalActual: tuition.totalActualAmount,
      })
      .from(student)
      .leftJoin(
        courseRegistration,
        eq(student.id, courseRegistration.studentId),
      )
      .leftJoin(
        tuition,
        eq(courseRegistration.id, tuition.courseRegistrationId),
      )
      .leftJoin(tuitionPayment, eq(tuition.id, tuitionPayment.tuitionId))
      .where(
        and(
          eq(courseRegistration.year, findTuitionDto.year),
          eq(courseRegistration.term, findTuitionDto.term),
        ),
      )
      .groupBy(student.id)
      .having(
        sql`sum(${tuitionPayment.amount}) is null or sum(${tuitionPayment.amount}) < ${tuition.totalActualAmount}`,
      );

    return result;
  }
}
