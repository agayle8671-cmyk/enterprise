import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing!");
  throw new Error("DATABASE_URL environment variable is not set");
}

console.log(`✅ Database Config: URL found, SSL=${process.env.NODE_ENV === "production" ? "Enabled" : "Disabled"}`);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
});

export const db = drizzle(pool);
