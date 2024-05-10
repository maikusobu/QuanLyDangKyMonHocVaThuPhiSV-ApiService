import { IsInt, IsNotEmpty, IsString, Length, Min } from "class-validator";
import { InsertCourse } from "src/db/schema";

export class CreateCourseDto implements InsertCourse {
  @IsNotEmpty({ message: "name Tên môn học không được để trống" })
  @Length(1, 100, {
    message: "name Tên môn học phải có độ dài từ 1 đến 100 ký tự",
  })
  @IsString()
  name: string;

  @Min(1, { message: "numberOfPeriods Số tiết học phải lớn hơn hoặc bằng 1" })
  @IsInt()
  numberOfPeriods: number;

  @IsNotEmpty({ message: "courseTypeId Lọai môn học không được để trống" })
  @IsInt()
  courseTypeId: number;

  @IsNotEmpty({ message: "facultyId Khoa không được để trống" })
  @IsInt()
  facultyId: number;
}
