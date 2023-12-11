import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const products = sqliteTable("products", {
  id: integer("id").primaryKey(),
  productCode: text("product_code").notNull(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  createdAt: integer("created_at", {
    mode: "timestamp",
  })
    .notNull()
    .default(sql`(strftime('%s','now'))`),
  updatedAt: integer("updated_at", {
    mode: "timestamp",
  }),
});
export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;
