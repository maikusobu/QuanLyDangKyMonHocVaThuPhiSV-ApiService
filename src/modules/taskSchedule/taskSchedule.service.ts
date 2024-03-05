import { Injectable, OnModuleInit, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import { END_POINTS } from "src/utils/constants";

import axios from "axios";
@Injectable()
export class TaskScheduleService implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    axios
      .get(
        `${this.configService.get<string>("url")}/${END_POINTS.BASE}/task-schedule`,
      )
      .then(() => {
        console.log(
          `Server pinged successfully at ${new Date().toISOString()}`,
        );
      })
      .catch((error) => {
        console.error(`Server ping failed: ${error}`);
      });
  }
  @Get()
  GetClientRequest() {
    return "Return server ping";
  }
  onModuleInit() {
    console.log("Initialization...");
    this.handleCron();
  }
}
