import { DB_CONNECTION_CONFIG } from "@/constants";
import { migrate } from "drizzle-orm/mysql2/migrator";
import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import path from "path";

const dbMigrate = async () => {
  try {
    const dbConnection = await mysql.createConnection(DB_CONNECTION_CONFIG);
    const dbMigrator = drizzle(dbConnection);

    await migrate(dbMigrator, {
      migrationsFolder: path.resolve("src/db/migrations"),
    });

    console.log("migration done");
    process.exit(0);
  } catch (e) {
    console.error("migration error:", e);
    process.exit(0);
  }
};

dbMigrate();
