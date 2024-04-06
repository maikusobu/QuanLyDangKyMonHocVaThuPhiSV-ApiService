import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { StudentModule } from "./module/student/student.module";
import configuration from "./config/configuration";
import modules from "./module";
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
      load: [configuration],
    }),
    ...modules,
    StudentModule,
  ],
})
export class AppModule {}
