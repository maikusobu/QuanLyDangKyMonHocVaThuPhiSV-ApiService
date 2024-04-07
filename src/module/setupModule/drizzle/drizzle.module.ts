import { Module, DynamicModule } from "@nestjs/common";
import { drizzleProvider } from "@common/providers/drizzle.provider";

@Module({})
export class DrizzleModule {
  static forRoot({ isGlobal = false }): DynamicModule {
    return {
      global: isGlobal,
      module: DrizzleModule,
      providers: [drizzleProvider],
      exports: [drizzleProvider],
    };
  }
}
