import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { products } from "../schema/product";
import { db } from "../access";
import { eq } from "drizzle-orm";

const insertProductSchema = createInsertSchema(products);

const deleteProductByIdSchema = z.number();

const findProductByCodeSchema = z.string();

const findProductByNameSchema = z.string();

const findProductByIdSchema = z.number();

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

export const findProductById = z
  .function()
  .args(findProductByIdSchema)
  .implement(async (productId) => {
    const product = await db.query.products.findFirst({
      where: (products, { eq }) => eq(products.id, productId),
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

export const listProducts = z
  .function()
  .args()
  .implement(async () => {
    const result = await db.select().from(products);
    return result;
  });

export const deleteProduct = z
  .function()
  .args(deleteProductByIdSchema)
  .implement(async (productId) => {
    await db.delete(products).where(eq(products.id, productId));
  });
