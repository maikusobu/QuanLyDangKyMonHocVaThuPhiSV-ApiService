import { Injectable, Logger } from "@nestjs/common";
import { Interval } from "@nestjs/schedule";
@Injectable()
export class TaskScheduleService {
  private readonly logger = new Logger(TaskScheduleService.name);
  @Interval(10000 * 60)
  handleInterval() {
    this.logger.debug("Called every 10 minutes");
  }
}
