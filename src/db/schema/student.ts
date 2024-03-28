import { char, date, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { major } from "./major";
import { district } from "./district";
import { priority } from "./priority";
import { genderEnum } from "./enums";
import { relations } from "drizzle-orm";
import { courseRegistration } from "./courseRegistration";

export const student = pgTable("student", {
  id: char("id", { length: 8 }).primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  dateOfBirth: date("date_of_birth").notNull(),
  gender: genderEnum("gender").notNull(),
  majorId: integer("major_id").notNull(),
  districtId: integer("district_id").notNull(),
  priorityId: integer("priority_id"),
});

export const studentRelations = relations(student, ({ one, many }) => ({
  major: one(major, {
    fields: [student.majorId],
    references: [major.id],
  }),
  district: one(district, {
    fields: [student.districtId],
    references: [district.id],
  }),
  priority: one(priority, {
    fields: [student.priorityId],
    references: [priority.id],
  }),
  courseRegistrations: many(courseRegistration),
}));
