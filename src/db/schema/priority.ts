import { relations } from "drizzle-orm";
import { numeric, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { student } from "./student";

export const priority = pgTable("priority", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  discountPercentage: numeric("discount_percentage", {
    precision: 5,
    scale: 2,
  }).notNull(),
});

export const priorityRelations = relations(priority, ({ many }) => ({
  students: many(student),
}));
