import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { listProduct } from "@inventory-management-system/core/db/entities/product";

export const handler = ApiHandler(async (_event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");
  const list = await listProduct();
  return {
    statusCode: 200,
    body: JSON.stringify(list),
  };
});
