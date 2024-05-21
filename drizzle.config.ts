import { type Config } from "drizzle-kit";

import { env } from "@/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  driver: "pg",
  dbCredentials: {
    url: env.POSTGRES_URL,
  },
  tablesFilter: ["slx_*"],
} satisfies Config;
