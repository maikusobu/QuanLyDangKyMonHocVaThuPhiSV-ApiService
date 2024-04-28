import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  Delete,
  Optional,
} from "@nestjs/common";
import { StudentService } from "./student.service";
import { CreateStudentDto } from "./dto/create-student.dto";
import { UpdateStudentDto } from "./dto/update-student.dto";
import { END_POINTS } from "@util/constants";
import { Public } from "@common/decorators/public.decorator";
@Controller(END_POINTS.STUDENT.BASE)
export class StudentController {
  constructor(private readonly studentService: StudentService) {}
  @Public()
  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.create(createStudentDto);
  }

  @Get()
  findAll(
    @Optional() @Query("name") name: string,
    @Optional() @Query("mssv") mssv: string,
  ) {
    return this.studentService.findFilteredStudentByNameOrByMSSV(name, mssv);
  }

  @Get(END_POINTS.STUDENT.GET_ONE)
  findOne(@Param("id") id: string) {
    return this.studentService.findOne(+id);
  }

  @Patch(END_POINTS.STUDENT.UPDATE)
  update(@Param("id") id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(+id, updateStudentDto);
  }
  @Delete(END_POINTS.STUDENT.DELETE)
  remove(@Param("id") id: string) {
    return this.studentService.delete(+id);
  }
}
