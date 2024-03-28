import {
  boolean,
  integer,
  pgTable,
  serial,
  varchar,
} from "drizzle-orm/pg-core";
import { province } from "./province";
import { relations } from "drizzle-orm";

export const district = pgTable("district", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  isMinor: boolean("is_minor").notNull(),
  provinceId: integer("province_id").notNull(),
});

export const districtRelations = relations(district, ({ one }) => ({
  province: one(province, {
    fields: [district.provinceId],
    references: [province.id],
  }),
}));
