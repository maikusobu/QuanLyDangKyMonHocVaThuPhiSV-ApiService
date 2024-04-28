import { Controller, Get } from "@nestjs/common";
import { MajorService } from "./major.service";
import { END_POINTS } from "@util/constants";

@Controller(END_POINTS.MAJOR.BASE)
export class MajorController {
  constructor(private readonly majorService: MajorService) {}
  @Get()
  findAll() {
    return this.majorService.findAll();
  }
}
