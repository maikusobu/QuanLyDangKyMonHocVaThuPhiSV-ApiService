import { programItem } from "@db/schema";
import { CreateProgramItemDto } from "@module/program-item/dto/create-program-item.dto";
import { UpdateProgramItemDto } from "@module/program-item/dto/update-program-item.dto";
import { Inject, Injectable } from "@nestjs/common";
import { Drizzle } from "@type/drizzle.type";
import { eq } from "drizzle-orm";

@Injectable()
export class ProgramItemRepository {
  constructor(@Inject("DRIZZLE") private drizzle: Drizzle) {}

  async create(body: CreateProgramItemDto) {
    return await this.drizzle.insert(programItem).values(body).returning();
  }

  async update(id: number, body: UpdateProgramItemDto) {
    return await this.drizzle
      .update(programItem)
      .set(body)
      .where(eq(programItem.id, id))
      .returning();
  }

  async remove(id: number) {
    return await this.drizzle
      .delete(programItem)
      .where(eq(programItem.id, id))
      .returning();
  }
}
