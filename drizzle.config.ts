import { loadEnvConfig } from "@next/env";
import { defineConfig } from "drizzle-kit";

// Carrega o .env.local como o Next faz.
loadEnvConfig(process.cwd());

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
