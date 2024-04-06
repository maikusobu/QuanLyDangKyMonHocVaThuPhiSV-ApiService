import { Injectable } from "@nestjs/common";
import { eq, and } from "drizzle-orm";
import { db } from "src/db";
import type { userInsertType, userSelectType } from "src/db/schema";
import { user } from "src/db/schema";
import { PERMISSIONS } from "@util/constants";
@Injectable()
export class UserRepository {
  async findByEmail(email: string) {
    return await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
  }
  async creater(userInsert: userInsertType) {
    return await db.insert(user).values(userInsert).returning();
  }
  async findById(id: number) {
    return await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  }
  async findPermission(userId: number, endpoint: string, method: PERMISSIONS) {
    const user: userSelectType = await this.findById(userId);
    const permission = await db.query.permission.findMany({
      where: (permission, { eq }) =>
        and(eq(permission.action, method), eq(permission.endpoint, endpoint)),
      with: {
        departmentPermissions: {
          where: (departmentPermission, { eq }) =>
            eq(departmentPermission.departmentId, user.departmentId),
        },
      },
    });
    if (permission.length === 0) {
      return false;
    }
    return true;
  }
  async updateById(id: number, userUpdate: userInsertType) {
    return await db
      .update(user)
      .set(userUpdate)
      .where(eq(user.id, id))
      .returning();
  }
}
