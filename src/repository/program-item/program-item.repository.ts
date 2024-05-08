import { programItem } from "@db/schema";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { eq } from "drizzle-orm";

@Injectable()
export class ProgramItemRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async remove(id: number) {
    return await this.drizzle
      .delete(programItem)
      .where(eq(programItem.id, id))
      .returning();
  }
}
