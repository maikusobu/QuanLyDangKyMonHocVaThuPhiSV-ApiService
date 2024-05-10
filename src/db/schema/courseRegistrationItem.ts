import { InferInsertModel, relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { course } from "./course";
import { courseRegistration } from "./courseRegistration";

export const courseRegistrationItem = pgTable(
  "course_registration_item",
  {
    courseId: integer("course_id").notNull(),
    courseRegistrationId: integer("course_registration_id").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.courseRegistrationId, table.courseId] }),
  }),
);

export const courseRegistrationItemRelations = relations(
  courseRegistrationItem,
  ({ one }) => ({
    course: one(course, {
      fields: [courseRegistrationItem.courseId],
      references: [course.id],
    }),
    courseRegistration: one(courseRegistration, {
      fields: [courseRegistrationItem.courseRegistrationId],
      references: [courseRegistration.id],
    }),
  }),
);
export type InsertCourseRegistrationItem = InferInsertModel<
  typeof courseRegistrationItem
>;
