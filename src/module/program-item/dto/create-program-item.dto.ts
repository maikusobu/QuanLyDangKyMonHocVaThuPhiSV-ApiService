import { InsertProgramItem } from "@db/schema";
import { TERM } from "@util/constants";
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateProgramItemDto implements InsertProgramItem {
  @IsNotEmpty({ message: "programId Chương trình học không được để trống" })
  @IsInt()
  programId: number;

  @IsNotEmpty({ message: "courseId Môn học không được để trống" })
  @IsInt()
  courseId: number;

  @IsNotEmpty({ message: "term Học kỳ không được để trống" })
  @IsEnum(TERM)
  term: TERM;

  @MaxLength(100, {
    message: "note Ghi chú không được quá 100 ký tự",
  })
  @IsString()
  @IsOptional()
  note?: string;
}
