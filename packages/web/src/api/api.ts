import * as z from "zod";
import wretch from "wretch";
import { InsertProduct } from "../../../core/src/db/schema/product";
import { API_TOKEN } from "@/constants";

const token = localStorage.getItem(API_TOKEN);
const externalApi = wretch(import.meta.env.VITE_API_ENDPOINT).auth(
  `Bearer ${token}`,
);
export const insertProduct = async (newProduct: InsertProduct) => {
  const schema = z.object({
    id: z.number(),
  });

  const product = await externalApi
    .url("/products")
    .json(newProduct)
    .post()
    .json(schema.safeParse);

  return product;
};

export const updateProduct = async (
  productId: string,
  updateWith: { productCode: string; productName: string; quantity: number },
) => externalApi.url(`/products/${productId}`).json(updateWith).put();

export const getProduct = async (productId: string) => {
  const schema = z.object({
    data: z.object({
      id: z.number(),
      productCode: z.string(),
      productName: z.string(),
      quantity: z.number(),
      createdAt: z.string().pipe(z.coerce.date()),
      updatedAt: z.nullable(z.string().pipe(z.coerce.date())),
    }),
  });
  const product = await externalApi
    .url(`/products/${productId}`)
    .get()
    .json(schema.safeParse);
  return product;
};

export const deleteProduct = async (productId: string) =>
  externalApi
    .url(`/products/${productId}`)
    .delete()
    .res(() => true);
