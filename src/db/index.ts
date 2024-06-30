import Database from "better-sqlite3";
import {
  drizzle,
  type BetterSQLite3Database,
} from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";

type User = typeof schema.users.$inferInsert;

const sqlite = new Database("local.db");

export const db: BetterSQLite3Database<typeof schema> = drizzle(sqlite, {
  schema,
});

export const createUser = async (user: User) =>
  await db.insert(schema.users).values(user).onConflictDoNothing();

export const getUsers = async () => await db.select().from(schema.users);
