import { relations } from "drizzle-orm";
import { bigint, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { course } from "./course";

export const courseType = pgTable("course_type", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  unitPrice: bigint("unit_price", { mode: "number" }).notNull(),
});

export const courseTypeRelations = relations(courseType, ({ many }) => ({
  courses: many(course),
}));
