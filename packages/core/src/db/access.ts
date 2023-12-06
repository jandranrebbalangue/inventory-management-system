import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/.";
import { Config } from "sst/node/config";
import * as schema from "./schema";

const client = createClient({
  url: Config.DATABASE_URL,
  authToken: Config.DATABASE_AUTH_TOKEN,
});
export const db = drizzle(client, {
  schema,
});
