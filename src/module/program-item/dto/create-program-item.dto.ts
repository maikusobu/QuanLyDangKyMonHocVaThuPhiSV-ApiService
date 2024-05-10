import { InsertProgramItem } from "@db/schema";
import { TERM } from "@util/constants";
import { Transform } from "class-transformer";
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class CreateProgramItemDto implements InsertProgramItem {
  @Transform(({ value }) => parseInt(value))
  @IsInt()
  programId: number;

  @Transform(({ value }) => parseInt(value))
  @IsInt()
  courseId: number;

  @IsEnum(TERM)
  term: TERM;

  @MaxLength(100, {
    message: "note Ghi chú không được quá 100 ký tự",
  })
  @IsString()
  @IsOptional()
  note?: string;
}
