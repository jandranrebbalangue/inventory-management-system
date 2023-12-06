import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/.";
import { Config } from "sst/node/config";

const sqliteCient = createClient({
  url: Config.DATABASE_URL,
  authToken: Config.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(sqliteCient);
