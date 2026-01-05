let pool: pg.Pool | null = null;
let dbInstance: any = null;

export function getDb() {
  if (dbInstance) return dbInstance;

  if (!process.env.DATABASE_URL) {
    console.error("❌ DATABASE_URL is missing! Queries will fail.");
    // We return a proxy or a dummy or just throw here depending on strategy
    // For now, let's keep the throw but only when called.
    throw new Error("DATABASE_URL environment variable is not set");
  }

  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : undefined,
  });

  dbInstance = drizzle(pool);
  return dbInstance;
}

// Fallback for existing static imports - this is the "Risky" part we usually want to avoid
// but for this refactor we will export a proxy or a lazy getter
export const db = new Proxy({} as any, {
  get: (target, prop) => {
    return getDb()[prop];
  }
});
