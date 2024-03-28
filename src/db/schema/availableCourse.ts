import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { termEnum } from "./enums";
import { relations } from "drizzle-orm";
import { availableCourseItem } from "./availableCourseItem";

export const availableCourse = pgTable("available_course", {
  id: serial("id").primaryKey(),
  year: integer("year").notNull(),
  term: termEnum("term"),
});

export const availableCourseRelations = relations(
  availableCourse,
  ({ many }) => ({
    availableCourseItems: many(availableCourseItem),
  }),
);
