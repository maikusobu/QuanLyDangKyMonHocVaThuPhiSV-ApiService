import { Module } from "@nestjs/common";
import { ProgramItemService } from "./program-item.service";
import { ProgramItemController } from "./program-item.controller";
import { ProgramItemRepository } from "@repository/program-item/program-item.repository";

@Module({
  controllers: [ProgramItemController],
  providers: [ProgramItemService, ProgramItemRepository],
})
export class ProgramItemModule {}
