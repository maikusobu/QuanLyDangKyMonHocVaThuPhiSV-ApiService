import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { faculty } from "./faculty";
import { relations } from "drizzle-orm";

export const major = pgTable("major", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  facultyId: integer("faculty_id").notNull(),
});

export const majorRelations = relations(major, ({ one }) => ({
  faculty: one(faculty, {
    fields: [major.facultyId],
    references: [faculty.id],
  }),
}));
