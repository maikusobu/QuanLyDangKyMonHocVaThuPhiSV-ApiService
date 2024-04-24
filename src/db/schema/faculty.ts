import { InferInsertModel, InferSelectModel, relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { major } from "./major";

export const faculty = pgTable("faculty", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
});

export const facultyRelations = relations(faculty, ({ many }) => ({
  majors: many(major),
}));

export type SelectFaculty = InferSelectModel<typeof faculty>;
export type InsertFaculty = InferInsertModel<typeof faculty>;
