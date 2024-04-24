import { Injectable, Inject } from "@nestjs/common";
import { eq, and } from "drizzle-orm";
import type { userInsertType, userSelectType } from "@db/schema";
import { user } from "@db/schema";
import { Drizzle } from "@type/drizzle.type";
import { PERMISSIONS } from "@util/constants";
@Injectable()
export class UserRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}
  async findByEmail(email: string) {
    return await this.drizzle.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
  }
  async creater(userInsert: userInsertType) {
    return await this.drizzle.insert(user).values(userInsert).returning();
  }
  async findById(id: number) {
    return await this.drizzle.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  }
  async findPermission(userId: number, endpoint: string, method: PERMISSIONS) {
    const user: userSelectType = await this.findById(userId);
    const permission = await this.drizzle.query.permission.findMany({
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
  async findUserWithDepartment(userId: number) {
    return await this.drizzle.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, userId),
      with: {
        department: true,
      },
    });
  }
  async updateById(id: number, userUpdate: userInsertType) {
    return await this.drizzle
      .update(user)
      .set(userUpdate)
      .where(eq(user.id, id))
      .returning();
  }
}
