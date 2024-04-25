import { Controller, Get } from "@nestjs/common";
import { END_POINTS } from "@util/constants";
import { CourseTypeService } from "./course-type.service";

@Controller(END_POINTS.COURSE_TYPE.BASE)
export class CourseTypeController {
  constructor(private readonly courseTypeService: CourseTypeService) {}

  @Get(END_POINTS.COURSE_TYPE.GET_ALL)
  findAll() {
    return this.courseTypeService.findAll();
  }
}
