import { PartialType } from "@nestjs/mapped-types";
import { CreateProgramItemDto } from "./create-program-item.dto";

export class UpdateProgramItemDto extends PartialType(CreateProgramItemDto) {}
