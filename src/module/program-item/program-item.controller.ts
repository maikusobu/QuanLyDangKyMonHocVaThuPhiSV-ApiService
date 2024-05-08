import { Controller, Delete, Param, ParseIntPipe } from "@nestjs/common";
import { ProgramItemService } from "./program-item.service";
import { END_POINTS } from "@util/constants";

@Controller(END_POINTS.PROGRAM_ITEM.BASE)
export class ProgramItemController {
  constructor(private readonly programItemService: ProgramItemService) {}

  @Delete(END_POINTS.PROGRAM_ITEM.DELETE)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.programItemService.remove(id);
  }
}
