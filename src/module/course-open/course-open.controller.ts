import { Body, Controller, Post } from "@nestjs/common";
import { CourseOpenService } from "./course-open.service";
import { END_POINTS } from "@util/constants";
import { CreateCourseOpenDto } from "./dto/create-course-open.dto";

@Controller(END_POINTS.COURSE_OPEN.BASE)
export class CourseOpenController {
  constructor(private readonly courseOpenService: CourseOpenService) {}

  @Post(END_POINTS.COURSE_OPEN.CREATE)
  create(@Body() createCourseOpenDto: CreateCourseOpenDto) {
    return this.courseOpenService.create(createCourseOpenDto);
  }
}
