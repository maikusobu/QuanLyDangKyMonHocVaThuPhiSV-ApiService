import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { ConfigModule } from "@nestjs/config";
import { DrizzleModule } from "@module/setupModule/drizzle/drizzle.module";
import { RepositoryModule } from "@module/setupModule/repository/repository.module";

import configuration from "./config/configuration";
import modules from "./module";
@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env`],
      load: [configuration],
    }),
    DrizzleModule.forRoot({ isGlobal: true }),
    RepositoryModule.forRoot({ isGlobal: true }),
    ...modules,
  ],
})
export class AppModule {}
