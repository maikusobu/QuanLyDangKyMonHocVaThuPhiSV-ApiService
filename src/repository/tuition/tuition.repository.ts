import { courseRegistration, tuition } from "@db/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { eq } from "drizzle-orm";

@Injectable()
export class TuitionRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async computeTuition(courseRegistrationId: number) {
    // Calculate register amount
    const registerInformation =
      await this.drizzle.query.courseRegistration.findFirst({
        where: eq(courseRegistration.id, courseRegistrationId),
        columns: {
          registrationDate: true,
        },
        with: {
          courseRegistrationItems: {
            columns: {},
            with: {
              course: {
                columns: {
                  numberOfPeriods: true,
                },
                with: {
                  courseType: {
                    columns: {
                      unitPrice: true,
                      name: true,
                    },
                  },
                },
              },
            },
          },
        },
      });

    let registerAmount = 0;

    for (const item of registerInformation.courseRegistrationItems) {
      let courseCredits = 0;
      if (item.course.courseType.name === "Lý thuyết") {
        courseCredits = item.course.numberOfPeriods / 15;
      } else {
        courseCredits = item.course.numberOfPeriods / 30;
      }

      registerAmount += item.course.courseType.unitPrice * courseCredits;
    }

    // Calculate actual amount

    const discountInformation =
      await this.drizzle.query.courseRegistration.findFirst({
        where: eq(courseRegistration.id, courseRegistrationId),
        columns: {},
        with: {
          student: {
            columns: {},
            with: {
              priority: {
                columns: {
                  discountPercentage: true,
                },
              },
            },
          },
        },
      });

    let actualAmount = 0;

    try {
      const discountPercentage = parseFloat(
        discountInformation.student.priority.discountPercentage,
      );
      actualAmount =
        registerAmount - (registerAmount * discountPercentage) / 100;
    } catch (error) {
      throw new Error("Discount percentage is not a number");
    }

    // Check if the Tuition is already computed, if yes, update it
    const existingTuition = await this.drizzle.query.tuition.findFirst({
      where: eq(tuition.courseRegistrationId, courseRegistrationId),
    });

    if (existingTuition) {
      return await this.drizzle
        .update(tuition)
        .set({
          tuitionDate: registerInformation.registrationDate,
          totalRegisterAmount: registerAmount,
          totalActualAmount: actualAmount,
        })
        .where(eq(tuition.id, existingTuition.id))
        .returning();
    }

    // If not, create a new Tuition

    const newTuition = {
      tuitionDate: registerInformation.registrationDate,
      totalRegisterAmount: registerAmount,
      totalActualAmount: actualAmount,
      courseRegistrationId: courseRegistrationId,
    };

    console.log("Computed tuition for registration: ", courseRegistrationId);

    return await this.drizzle.insert(tuition).values(newTuition).returning();
  }
}
