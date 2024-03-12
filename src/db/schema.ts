import { pgTable, varchar, text, serial } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id").primaryKey().notNull(),
  email: text("email").unique().notNull(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
});
