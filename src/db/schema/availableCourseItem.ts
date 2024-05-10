import { InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { course } from "./course";
import { availableCourse } from "./availableCourse";

export const availableCourseItem = pgTable(
  "available_course_item",
  {
    courseId: integer("course_id").notNull(),
    availableCourseId: integer("available_course_id").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.availableCourseId, table.courseId] }),
  }),
);

export const availableCourseItemRelations = relations(
  availableCourseItem,
  ({ one }) => ({
    course: one(course, {
      fields: [availableCourseItem.courseId],
      references: [course.id],
    }),
    availableCourse: one(availableCourse, {
      fields: [availableCourseItem.availableCourseId],
      references: [availableCourse.id],
    }),
  }),
);

export type InsertAvailableCourseItem = InferInsertModel<
  typeof availableCourseItem
>;
