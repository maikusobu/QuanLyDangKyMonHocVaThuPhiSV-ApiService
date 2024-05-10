import {
  Body,
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from "@nestjs/common";
import { ProgramItemService } from "./program-item.service";
import { END_POINTS } from "@util/constants";
import { CreateProgramItemDto } from "./dto/create-program-item.dto";
import { UpdateProgramItemDto } from "./dto/update-program-item.dto";

@Controller(END_POINTS.PROGRAM_ITEM.BASE)
export class ProgramItemController {
  constructor(private readonly programItemService: ProgramItemService) {}

  @Post(END_POINTS.PROGRAM_ITEM.CREATE)
  create(@Body() body: CreateProgramItemDto) {
    return this.programItemService.create(body);
  }

  @Patch(END_POINTS.PROGRAM_ITEM.UPDATE)
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body() body: UpdateProgramItemDto,
  ) {
    return this.programItemService.update(id, body);
  }

  @Delete(END_POINTS.PROGRAM_ITEM.DELETE)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.programItemService.remove(id);
  }
}
