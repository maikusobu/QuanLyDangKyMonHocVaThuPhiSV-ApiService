import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { courseType } from "./courseType";
import { faculty } from "./faculty";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { programItem } from "./programItem";

export const course = pgTable("course", {
  id: serial("id").primaryKey(),
  name: varchar("100").notNull(),
  numberOfPeriods: integer("number_of_periods").notNull(),
  courseTypeId: integer("course_type_id").notNull(),
  facultyId: integer("faculty_id").notNull(),
});

export const courseRelations = relations(course, ({ one, many }) => ({
  courseType: one(courseType, {
    fields: [course.courseTypeId],
    references: [courseType.id],
  }),
  faculty: one(faculty, {
    fields: [course.facultyId],
    references: [faculty.id],
  }),
  programItems: many(programItem),
}));

export type SelectCourse = InferSelectModel<typeof course>;
export type InsertCourse = InferInsertModel<typeof course>;
