import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey } from "drizzle-orm/pg-core";
import { department } from "./department";
import { permission } from "./permission";

export const departmentPermission = pgTable(
  "department_permission",
  {
    departmentId: integer("department_id").notNull(),
    permissionId: integer("permission_id").notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.departmentId, table.permissionId] }),
  }),
);

export const departmentPermissionRelations = relations(
  departmentPermission,
  ({ one }) => ({
    department: one(department, {
      fields: [departmentPermission.departmentId],
      references: [department.id],
    }),
    permission: one(permission, {
      fields: [departmentPermission.permissionId],
      references: [permission.id],
    }),
  }),
);
