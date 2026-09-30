import { eq } from "drizzle-orm";
import { neon } from "@neondatabase/serverless";
import { hashPassword } from "better-auth/crypto";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/neon-http";

import { account, session, user, verification } from "../lib/db/auth-schema";

config({ path: [".env.local", ".env"], quiet: true });

async function seedAdmin() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must both be set. Add them to .env.");
  }

  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing.");
  }

  const db = drizzle(neon(process.env.DATABASE_URL), {
    schema: { user, session, account, verification },
  });

  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(eq(user.email, email))
    .limit(1);

  if (existing) {
    console.log(`User ${email} already exists. Nothing to do.`);
    return;
  }

  const userId = crypto.randomUUID();

  await db.insert(user).values({
    id: userId,
    name: process.env.ADMIN_NAME ?? "Siddharth Udupa",
    email,
    emailVerified: true,
    role: "admin",
  });

  await db.insert(account).values({
    id: crypto.randomUUID(),
    userId,
    accountId: userId,
    providerId: "credential",
    password: await hashPassword(password),
  });

  console.log(`Created admin user ${email}. Sign in at /admin/login.`);
}

seedAdmin().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
