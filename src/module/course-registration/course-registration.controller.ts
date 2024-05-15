import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from "@nestjs/common";
import { CourseRegistrationService } from "./course-registration.service";
import { CreateCourseRegistrationFormDto } from "./dto/create-course-registration-form.dto";
import { END_POINTS } from "@util/constants";
import { GetAllCourseRegistrationDto } from "./dto/get-all-course-registration.dto";

@Controller(END_POINTS.COURSE_REGISTRATION.BASE)
export class CourseRegistrationController {
  constructor(
    private readonly courseRegistrationService: CourseRegistrationService,
  ) {}

  @Post(END_POINTS.COURSE_REGISTRATION.CREATE)
  create(
    @Body() createCourseRegistrationFormDto: CreateCourseRegistrationFormDto,
  ) {
    return this.courseRegistrationService.create(
      createCourseRegistrationFormDto,
    );
  }

  @Get(END_POINTS.COURSE_REGISTRATION.GET_ALL)
  findAll(@Query() getAllCourseRegistrationDto: GetAllCourseRegistrationDto) {
    return this.courseRegistrationService.findAll(getAllCourseRegistrationDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.courseRegistrationService.findOne(+id);
  }
  @Get(END_POINTS.COURSE_REGISTRATION.GET_CURRENT)
  findCurrent(
    @Query() getAllCourseRegistrationDto: GetAllCourseRegistrationDto,
  ) {
    const { term, year } = getAllCourseRegistrationDto;
    return this.courseRegistrationService.findCurrent(term, year);
  }
  // @Patch(":id")
  // update(
  //   @Param("id") id: string,
  //   @Body() updateCourseRegistrationDto: UpdateCourseRegistrationDto,
  // ) {
  //   return this.courseRegistrationService.update(
  //     +id,
  //     updateCourseRegistrationDto,
  //   );
  // }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.courseRegistrationService.remove(+id);
  }
}
