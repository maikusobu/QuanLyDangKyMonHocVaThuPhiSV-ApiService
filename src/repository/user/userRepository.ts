import { Injectable } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { db } from "src/db";
import type { userInsertType } from "src/db/schema";
import { user } from "src/db/schema";
@Injectable()
export class userRepository {
  async getUserByEmail(email: string) {
    await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.email, email),
    });
  }
  async createUser(userInsert: userInsertType) {
    return await db.insert(user).values(userInsert).returning();
  }
  async getUserById(id: number) {
    return await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, id),
    });
  }
  async updateUserById(id: number, userUpdate: userInsertType) {
    return await db
      .update(user)
      .set(userUpdate)
      .where(eq(user.id, id))
      .returning();
  }
}
