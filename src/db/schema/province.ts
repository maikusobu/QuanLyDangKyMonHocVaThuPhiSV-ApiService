import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { district } from "./district";

export const province = pgTable("province", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
});

export const provinceRelations = relations(province, ({ many }) => ({
  districts: many(district),
}));
