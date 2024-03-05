import { Injectable, OnModuleInit } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron, CronExpression } from "@nestjs/schedule";
import axios from "axios";
@Injectable()
export class TaskScheduleService implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  @Cron(CronExpression.EVERY_10_MINUTES)
  handleCron() {
    axios
      .get(this.configService.get<string>("PING_URL"))
      .then(() => {
        console.log(
          `Server pinged successfully at ${new Date().toISOString()}`,
        );
      })
      .catch((error) => {
        console.error(`Server ping failed: ${error}`);
      });
  }

  onModuleInit() {
    console.log("Initialization...");
    this.handleCron();
  }
}
