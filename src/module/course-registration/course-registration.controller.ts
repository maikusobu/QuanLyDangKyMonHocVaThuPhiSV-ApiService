import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Patch,
} from "@nestjs/common";
import { CourseRegistrationService } from "./course-registration.service";
import { END_POINTS } from "@util/constants";
import { GetAllCourseRegistrationDto } from "./dto/get-all-course-registration.dto";
import { DeleteRegistrationDto } from "./dto/delete-registration.dto";
import { CreateCourseRegistrationDto } from "./dto/create-course-registration.dto";
import { CloseCurrentStateDto } from "./dto/close-current-state.dto";

@Controller(END_POINTS.COURSE_REGISTRATION.BASE)
export class CourseRegistrationController {
  constructor(
    private readonly courseRegistrationService: CourseRegistrationService,
  ) {}

  @Post(END_POINTS.COURSE_REGISTRATION.CREATE)
  create(@Body() createCourseRegistrationDto: CreateCourseRegistrationDto) {
    return this.courseRegistrationService.create(createCourseRegistrationDto);
  }

  @Get(END_POINTS.COURSE_REGISTRATION.GET_ALL)
  findAllOneTerm(
    @Query() getAllCourseRegistrationDto: GetAllCourseRegistrationDto,
  ) {
    return this.courseRegistrationService.findAllOneTerm(
      getAllCourseRegistrationDto,
    );
  }

  @Patch(END_POINTS.COURSE_REGISTRATION.CURRENT_STATE)
  closeCurrentState(@Query() closeCurrentStateDto: CloseCurrentStateDto) {
    return this.courseRegistrationService.closeCurrentState(
      closeCurrentStateDto,
    );
  }

  @Delete(END_POINTS.COURSE_REGISTRATION.DELETE)
  remove(@Body() deleteRegistrationDto: DeleteRegistrationDto) {
    return this.courseRegistrationService.remove(deleteRegistrationDto);
  }
}
