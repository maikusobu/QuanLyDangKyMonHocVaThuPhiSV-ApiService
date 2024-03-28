import { char, date, integer, pgTable, serial } from "drizzle-orm/pg-core";
import { termEnum } from "./enums";
import { student } from "./student";
import { courseRegistrationItem } from "./courseRegistrationItem";
import { relations } from "drizzle-orm";
import { tuition } from "./tuition";

export const courseRegistration = pgTable("course_registration", {
  id: serial("id").primaryKey(),
  registrationDate: date("registration_date").notNull(),
  year: integer("year").notNull(),
  term: termEnum("term").notNull(),
  studentId: char("student_id", { length: 8 }).notNull(),
});

export const courseRegistrationRelations = relations(
  courseRegistration,
  ({ one, many }) => ({
    student: one(student, {
      fields: [courseRegistration.studentId],
      references: [student.id],
    }),
    tuition: one(tuition),
    courseRegistrationItems: many(courseRegistrationItem),
  }),
);
