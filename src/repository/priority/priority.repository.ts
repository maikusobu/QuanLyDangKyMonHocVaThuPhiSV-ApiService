import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { priority } from "@db/schema";
import { ne } from "drizzle-orm";
@Injectable()
export class PriorityRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}
  async getAllPriority() {
    return await this.drizzle.select().from(priority).where(ne(priority.id, 3));
  }
}
