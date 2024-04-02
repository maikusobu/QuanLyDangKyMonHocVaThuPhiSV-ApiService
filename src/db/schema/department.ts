import { relations } from "drizzle-orm";
import { pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { user } from "./user";
import { departmentPermission } from "./departmentPermission";

export const department = pgTable("department", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

export const departmentRelations = relations(department, ({ many }) => ({
  users: many(user),
  departmentPermissions: many(departmentPermission),
}));
