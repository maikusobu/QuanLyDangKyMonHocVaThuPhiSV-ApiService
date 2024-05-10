import { Controller, Get, Param, ParseIntPipe } from "@nestjs/common";
import { MajorService } from "./major.service";
import { END_POINTS } from "@util/constants";

@Controller(END_POINTS.MAJOR.BASE)
export class MajorController {
  constructor(private readonly majorService: MajorService) {}
  @Get(END_POINTS.MAJOR.GET_ALL)
  findAll() {
    return this.majorService.findAll();
  }

  @Get(END_POINTS.MAJOR.GET_PROGRAM)
  findProgramByMajorId(@Param("id", ParseIntPipe) id: number) {
    return this.majorService.findProgramByMajorId(id);
  }
}
