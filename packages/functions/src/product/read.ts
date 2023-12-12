import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { findProductById } from "@inventory-management-system/core/db/entities/product";

type ProductGetParams = {
  id: string;
};

export const handler = ApiHandler(async (event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");

  const params = event.pathParameters;
  const { id } = params as ProductGetParams;
  const productId = parseInt(id, 10);
  const product = await findProductById(productId);
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
});
