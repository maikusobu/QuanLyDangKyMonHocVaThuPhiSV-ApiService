import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { departmentPermission, permission } from "./schema";
import { permissionData } from "./seed/permission";
import { END_POINTS } from "../util/constants";
const permissionSeed = async () => {
  const client = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  const db = drizzle(client);
  type DepartmentIDs = {
    ctsvID: number;
    khtcID: number;
    dtID: number;
  };

  const departmentID: DepartmentIDs = {
    ctsvID: 1,
    khtcID: 2,
    dtID: 3,
  };

  type PermissionType = {
    id: number;
    endpoint: string;
    action: "get" | "post" | "put" | "patch" | "delete";
  };

  interface EndpointMapping {
    [key: string]: number[];
  }

  // Define endpoint to department mappings
  const endpointToDepartments: EndpointMapping = {
    [END_POINTS.COURSE.BASE]: [departmentID.ctsvID],
    [END_POINTS.STUDENT.BASE]: [departmentID.ctsvID],
    [END_POINTS.FACULTY.BASE]: [departmentID.dtID, departmentID.ctsvID],
    [END_POINTS.MAJOR.BASE]: [departmentID.dtID, departmentID.ctsvID],
    [END_POINTS.PAYMENT.BASE]: [departmentID.khtcID],
    [END_POINTS.PRIORITY.BASE]: [departmentID.ctsvID],
    [END_POINTS.PROGRAM_ITEM.BASE]: [departmentID.dtID],
    [END_POINTS.PROVINCE.BASE]: [departmentID.ctsvID],
    [END_POINTS.COURSE_REGISTRATION.BASE]: [departmentID.khtcID],
    [END_POINTS.COURSE_OPEN.BASE]: [departmentID.dtID],
  };

  // Function to insert department permissions
  async function insertDepartmentPermissions(item: PermissionType) {
    for (const endpoint in endpointToDepartments) {
      if (item.endpoint.includes(endpoint)) {
        const departments = endpointToDepartments[endpoint];
        for (const departmentId of departments) {
          const value = {
            departmentId,
            permissionId: item.id,
          };
          await db.insert(departmentPermission).values(value);
        }
      }
    }
  }

  const permissions: PermissionType[] = await db
    .insert(permission)
    .values(permissionData)
    .returning();

  for (const item of permissions) {
    await insertDepartmentPermissions(item);
  }
};
permissionSeed();
