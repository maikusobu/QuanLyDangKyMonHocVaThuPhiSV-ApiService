import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from "@nestjs/common";
import { CourseService } from "./course.service";
import { CreateCourseDto } from "./dto/create-course.dto";
import { UpdateCourseDto } from "./dto/update-course.dto";
import { END_POINTS } from "@util/constants";
import { FilterCourseDto } from "./dto/filter-course.dto";

@Controller(END_POINTS.COURSE.BASE)
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post(END_POINTS.COURSE.CREATE)
  create(@Body() body: CreateCourseDto) {
    return this.courseService.create(body);
  }

  @Get(END_POINTS.COURSE.GET_ALL)
  findAll(@Query() query: FilterCourseDto) {
    return this.courseService.findAll(query);
  }

  @Get(END_POINTS.COURSE.GET_ONE)
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.courseService.findOne(id);
  }

  @Patch(END_POINTS.COURSE.UPDATE)
  update(@Param("id", ParseIntPipe) id: number, @Body() body: UpdateCourseDto) {
    return this.courseService.update(id, body);
  }

  @Delete(END_POINTS.COURSE.DELETE)
  remove(@Param("id", ParseIntPipe) id: number) {
    return this.courseService.remove(id);
  }
}
