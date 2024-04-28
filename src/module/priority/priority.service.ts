import { Injectable } from "@nestjs/common";
import { PriorityRepository } from "@repository/priority/priority.repository";
@Injectable()
export class PriorityService {
  constructor(private priorityRepository: PriorityRepository) {}
  async findAll() {
    return this.priorityRepository.getAllPriority();
  }
}
