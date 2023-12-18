import { ApiHandler, usePathParam } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { findProductById } from "@inventory-management-system/core/db/entities/product";

export const handler = ApiHandler(async (_event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");
  const id = usePathParam("id") as string;
  const productId = parseInt(id, 10);
  const product = await findProductById(productId);
  return {
    statusCode: 200,
    body: JSON.stringify(product),
  };
});
