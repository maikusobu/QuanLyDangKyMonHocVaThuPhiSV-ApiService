import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  out: "./drizzle",
  schema: "./src/db/schema/*",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
} satisfies Config;
