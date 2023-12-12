import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { listProducts } from "@inventory-management-system/core/db/entities/product";

export const handler = ApiHandler(async (_event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");
  const list = await listProducts();
  return {
    statusCode: 200,
    body: JSON.stringify(list),
  };
});
