import { Controller, Get } from "@nestjs/common";
import { END_POINTS } from "@util/constants";
import { FacultyService } from "./faculty.service";

@Controller(END_POINTS.FACULTY.BASE)
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  @Get(END_POINTS.FACULTY.GET_ALL)
  findAll() {
    return this.facultyService.findAll();
  }
}
