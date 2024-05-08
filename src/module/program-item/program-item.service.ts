import { Injectable } from "@nestjs/common";
import { ProgramItemRepository } from "@repository/program-item/program-item.repository";

@Injectable()
export class ProgramItemService {
  constructor(private readonly programItemRepository: ProgramItemRepository) {}

  remove(id: number) {
    return this.programItemRepository.remove(id);
  }
}
