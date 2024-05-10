import { relations } from "drizzle-orm";
import { date, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { tuition } from "./tuition";

export const tuitionPayment = pgTable("tuition_payment", {
  id: serial("id").primaryKey(),
  paymentDate: date("payment_date").notNull(),
  amount: integer("amount").notNull(),
  tuitionId: integer("tuition_id").notNull(),
});

export const tuitionPaymentRelations = relations(tuitionPayment, ({ one }) => ({
  tuition: one(tuition, {
    fields: [tuitionPayment.tuitionId],
    references: [tuition.id],
  }),
}));
