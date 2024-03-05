import { Controller, Get } from "@nestjs/common";
import { TaskScheduleService } from "./taskSchedule.service";

@Controller("task-schedule")
export class TaskScheduleController {
  constructor(private readonly taskScheduleService: TaskScheduleService) {}
  @Get()
  async getAllTaskSchedules() {
    return this.taskScheduleService.GetClientRequest();
  }
}
