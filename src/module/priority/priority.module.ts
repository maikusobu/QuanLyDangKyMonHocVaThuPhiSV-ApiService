import { Module } from "@nestjs/common";
import { PriorityService } from "./priority.service";
import { PriorityController } from "./priority.controller";

@Module({
  controllers: [PriorityController],
  providers: [PriorityService],
})
export class PriorityModule {}
