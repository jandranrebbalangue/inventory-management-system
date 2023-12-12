import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { products } from "../schema/product";
import { db } from "../access";

const insertProductSchema = createInsertSchema(products);

const findProductByCodeSchema = z.string();

const findProductByNameSchema = z.string();

export const findProductByName = z
  .function()
  .args(findProductByNameSchema)
  .implement(async (productName) => {
    await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.productName, productName),
    });
  });

export const findProductByCode = z
  .function()
  .args(findProductByCodeSchema)
  .implement(async (productCode) => {
    const product = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.productCode, productCode),
    });
    return product;
  });

export const createProduct = z
  .function()
  .args(insertProductSchema)
  .implement(async (newProduct) => {
    const product = await db
      .insert(products)
      .values(newProduct)
      .returning({ productCode: products.productCode });
    return product[0].productCode;
  });

export const listProduct = z
  .function()
  .args()
  .implement(async () => {
    const result = await db.select().from(products);
    return result;
  });
