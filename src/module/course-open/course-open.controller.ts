import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { CourseOpenService } from "./course-open.service";
import { END_POINTS, TERM } from "@util/constants";
import { CreateCourseOpenDto } from "./dto/create-course-open.dto";

@Controller(END_POINTS.COURSE_OPEN.BASE)
export class CourseOpenController {
  constructor(private readonly courseOpenService: CourseOpenService) {}

  @Post(END_POINTS.COURSE_OPEN.CREATE)
  create(@Body() createCourseOpenDto: CreateCourseOpenDto) {
    return this.courseOpenService.create(createCourseOpenDto);
  }

  @Get(END_POINTS.COURSE_OPEN.GET_ALL_ONE_TERM)
  findAllOneTerm(@Query("year") year: number, @Query("term") term: TERM) {
    return this.courseOpenService.findAllOneTerm(year, term);
  }
}
