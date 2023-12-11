import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { products } from "../schema/product";
import { db } from "../access";

const insertProductSchema = createInsertSchema(products);

const findProductByIdSchema = z.string();

const findProductByNameSchema = z.string();

export const findProductById = z
  .function()
  .args(findProductByIdSchema)
  .implement(async (productId) => {
    await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.productCode, productId),
    });
  });

export const findProductByName = z
  .function()
  .args(findProductByNameSchema)
  .implement(async (productName) => {
    const product = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.name, productName),
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
      .returning({ id: products.productCode });
    return product[0].id;
  });
