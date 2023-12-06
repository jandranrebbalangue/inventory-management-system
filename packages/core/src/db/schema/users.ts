import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  avatar_url: text("avatar_url"),
  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(strftime('%s','now))`),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  }),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
