import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as schema from "./schema";

type Database = ReturnType<typeof createDatabase>;

let database: Database | null = null;

function createDatabase() {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Copy .env.example to .env.local and add your Neon connection string.",
    );
  }

  return drizzle(neon(url), { schema });
}

// Resolved on first query so a missing DATABASE_URL surfaces where the data is
// actually needed, instead of breaking every route at import time.
export const db: Database = new Proxy({} as Database, {
  get(_target, property) {
    database ??= createDatabase();
    return Reflect.get(database, property);
  },
});

export { schema };
