import { Module } from "@nestjs/common";
import { TaskScheduleService } from "./taskSchedule.service";
@Module({
  providers: [TaskScheduleService],
})
export class TaskScheduleModule {}
