import { Provider } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
export const drizzleProvider: Provider = {
  provide: "DRIZZLE",
  useFactory: async (config: ConfigService) => {
    const schema = await import("../../db/schema");
    const connectionString = config.get<string>("DATABASE_URL");
    console.log(connectionString);
    const client = postgres(connectionString, { prepare: false });
    return drizzle(client, { schema });
  },
  inject: [ConfigService],
};
