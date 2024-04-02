import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { actionEnum } from "./enums";
import { relations } from "drizzle-orm";
import { departmentPermission } from "./departmentPermission";

export const permission = pgTable("permission", {
  id: serial("id").primaryKey(),
  endpoint: varchar("endpoint", { length: 100 }).notNull(),
  action: actionEnum("action").notNull(),
});

export const permissionRelations = relations(permission, ({ many }) => ({
  departmentPermissions: many(departmentPermission),
}));
