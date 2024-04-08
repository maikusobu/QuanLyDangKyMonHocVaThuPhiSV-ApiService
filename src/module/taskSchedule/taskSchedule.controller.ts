import { Controller, Get } from "@nestjs/common";
import { TaskScheduleService } from "./taskSchedule.service";
import { END_POINTS } from "src/util/constants";
import { Public } from "@common/decorators/public.decorator";
const { TASK_SCHEDULE } = END_POINTS;

@Controller(TASK_SCHEDULE.BASE)
export class TaskScheduleController {
  constructor(private readonly taskScheduleService: TaskScheduleService) {}
  @Get()
  @Public()
  async getAllTaskSchedules() {
    return this.taskScheduleService.GetClientRequest();
  }
}
