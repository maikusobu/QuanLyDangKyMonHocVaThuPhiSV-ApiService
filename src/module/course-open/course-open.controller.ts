import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from "@nestjs/common";
import { CourseOpenService } from "./course-open.service";
import { END_POINTS } from "@util/constants";
import { CreateCourseOpenDto } from "./dto/create-course-open.dto";
import { FindCourseOpenDto } from "./dto/find-course-open.dto";
import { DeleteCourseOpenDto } from "./dto/delete-course-open.dto";

@Controller(END_POINTS.COURSE_OPEN.BASE)
export class CourseOpenController {
  constructor(private readonly courseOpenService: CourseOpenService) {}

  @Post(END_POINTS.COURSE_OPEN.CREATE)
  create(@Body() createCourseOpenDto: CreateCourseOpenDto) {
    return this.courseOpenService.create(createCourseOpenDto);
  }

  @Get(END_POINTS.COURSE_OPEN.GET_ALL_ONE_TERM)
  findAllOneTerm(@Query() findCourseOpenDto: FindCourseOpenDto) {
    return this.courseOpenService.findAllOneTerm(findCourseOpenDto);
  }

  @Delete(END_POINTS.COURSE_OPEN.DELETE)
  delete(@Param() deleteCourseOpenDto: DeleteCourseOpenDto) {
    return this.courseOpenService.delete(deleteCourseOpenDto);
  }
}
