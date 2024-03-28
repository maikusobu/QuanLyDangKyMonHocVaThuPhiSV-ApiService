import { Injectable, OnModuleInit, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron } from "@nestjs/schedule";
import { END_POINTS } from "src/util/constants";
import axios from "axios";
@Injectable()
export class TaskScheduleService implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  @Cron("0 0-23/3 * * *")
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
