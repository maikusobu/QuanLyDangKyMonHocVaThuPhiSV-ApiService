import { Transform } from "class-transformer";
import { IsInt, IsString, Length, Min } from "class-validator";
import { InsertCourse } from "src/db/schema";

export class CreateCourseDto implements InsertCourse {
  @Length(1, 100, { message: "Tên môn học phải có độ dài từ 1 đến 100 ký tự" })
  @IsString()
  name: string;

  @Transform(({ value }) => parseInt(value))
  @Min(1, { message: "Số tiết học phải lớn hơn hoặc bằng 1" })
  @IsInt({ message: "Số tiết học phải là số nguyên dương" })
  numberOfPeriods: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  courseTypeId: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  facultyId: number;
}
