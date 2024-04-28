import { Controller, Get } from "@nestjs/common";
import { PriorityService } from "./priority.service";
import { END_POINTS } from "@util/constants";

@Controller(END_POINTS.PRIORITY.BASE)
export class PriorityController {
  constructor(private readonly priorityService: PriorityService) {}

  @Get()
  findAll() {
    return this.priorityService.findAll();
  }
}
