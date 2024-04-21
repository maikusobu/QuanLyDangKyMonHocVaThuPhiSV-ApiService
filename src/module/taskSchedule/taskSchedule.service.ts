import { Injectable, OnModuleInit, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TaskScheduleService implements OnModuleInit {
  constructor(private configService: ConfigService) {}
  @Cron("0 0-23/3 * * *")
  handleCron() {
    console.log("Called every 3 hours");
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
