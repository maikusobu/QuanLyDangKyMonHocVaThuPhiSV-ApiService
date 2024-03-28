import { relations } from "drizzle-orm";
import { date, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { courseRegistration } from "./courseRegistration";
import { tuitionPayment } from "./tuitionPayment";

export const tuition = pgTable("tuition", {
  id: serial("id").primaryKey(),
  tuitionDate: date("tuition_date").notNull(),
  totalRegisterAmount: integer("total_registered_amount").notNull(),
  totalActualAmount: integer("total_actual_amount").notNull(),
  courseRegistrationId: integer("course_registration_id").notNull(),
});

export const tuitionRelations = relations(tuition, ({ one, many }) => ({
  courseRegistration: one(courseRegistration, {
    fields: [tuition.courseRegistrationId],
    references: [courseRegistration.id],
  }),
  tuitionPayments: many(tuitionPayment),
}));
