import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
  id: serial("id").primaryKey(),
  fullName: varchar("full_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 320 }).notNull().unique(),
  hashedPassword: varchar("hashed_password", { length: 100 }).notNull(),
});
