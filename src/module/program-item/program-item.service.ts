import { Injectable } from "@nestjs/common";
import { ProgramItemRepository } from "@repository/program-item/program-item.repository";
import { CreateProgramItemDto } from "./dto/create-program-item.dto";
import { UpdateProgramItemDto } from "./dto/update-program-item.dto";

@Injectable()
export class ProgramItemService {
  constructor(private readonly programItemRepository: ProgramItemRepository) {}

  create(body: CreateProgramItemDto) {
    return this.programItemRepository.create(body);
  }

  update(id: number, body: UpdateProgramItemDto) {
    return this.programItemRepository.update(id, body);
  }

  remove(id: number) {
    return this.programItemRepository.remove(id);
  }
}
