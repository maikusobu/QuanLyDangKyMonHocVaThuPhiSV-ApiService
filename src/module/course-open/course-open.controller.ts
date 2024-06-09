import { Controller, Get, Query } from "@nestjs/common";
import { CourseOpenService } from "./course-open.service";
import { END_POINTS } from "@util/constants";
import { FindCourseOpenDto } from "./dto/find-course-open.dto";

@Controller(END_POINTS.COURSE_OPEN.BASE)
export class CourseOpenController {
  constructor(private readonly courseOpenService: CourseOpenService) {}

  // @Post(END_POINTS.COURSE_OPEN.CREATE)
  // create(@Body() createCourseOpenDto: CreateCourseOpenDto) {
  //   return this.courseOpenService.create(createCourseOpenDto);
  // }

  // @Post(END_POINTS.COURSE_OPEN.CURRENT_STATE)
  // closeCurrentState(@Body() closeCurrentStateDto: CloseCurrentStateDto) {
  //   return this.courseOpenService.closeCurrentState(closeCurrentStateDto);
  // }

  @Get(END_POINTS.COURSE_OPEN.GET_ALL_ONE_TERM)
  findAllOneTerm(@Query() findCourseOpenDto: FindCourseOpenDto) {
    return this.courseOpenService.findAllOneTerm(findCourseOpenDto);
  }

  // @Delete(END_POINTS.COURSE_OPEN.DELETE)
  // delete(@Body() deleteCourseOpenDto: DeleteCourseOpenDto) {
  //   return this.courseOpenService.delete(deleteCourseOpenDto);
  // }
}
