import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { program } from "./program";
import { course } from "./course";
import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { termEnum } from "./enums";

export const programItem = pgTable("program_item", {
  id: serial("id").primaryKey(),
  programId: integer("program_id").notNull(),
  courseId: integer("course_id").notNull(),
  term: termEnum("term").notNull(),
  note: varchar("note", { length: 100 }),
});

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

export type SelectProgramItem = InferSelectModel<typeof programItem>;
export type InsertProgramItem = InferInsertModel<typeof programItem>;
