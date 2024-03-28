import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { program } from "./program";
import { course } from "./course";
import { relations } from "drizzle-orm";

export const programItem = pgTable(
  "program_item",
  {
    programId: integer("program_id").notNull(),
    courseId: integer("course_id").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.programId, table.courseId] }),
  }),
);

export const programItemRelations = relations(programItem, ({ one }) => ({
  program: one(program, {
    fields: [programItem.programId],
    references: [program.id],
  }),
  course: one(course, {
    fields: [programItem.courseId],
    references: [course.id],
  }),
}));
