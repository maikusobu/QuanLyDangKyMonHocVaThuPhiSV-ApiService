import { Module } from "@nestjs/common";
import { TaskScheduleService } from "./taskSchedule.service";
import { TaskScheduleController } from "./taskSchedule.controller";
@Module({
  providers: [TaskScheduleService],
  controllers: [TaskScheduleController],
})
export class TaskScheduleModule {}
