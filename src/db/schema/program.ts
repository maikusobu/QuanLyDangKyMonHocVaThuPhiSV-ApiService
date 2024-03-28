import { integer, pgTable, serial } from "drizzle-orm/pg-core";
import { major } from "./major";
import { termEnum } from "./enums";
import { relations } from "drizzle-orm";
import { programItem } from "./programItem";

export const program = pgTable("program", {
  id: serial("id").primaryKey(),
  term: termEnum("term").notNull(),
  majorId: integer("major_id").notNull(),
});

export const programRelations = relations(program, ({ one, many }) => ({
  major: one(major, {
    fields: [program.majorId],
    references: [major.id],
  }),
  programItems: many(programItem),
}));
