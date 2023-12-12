import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { deleteProduct } from "@inventory-management-system/core/db/entities/product";

type ProductDeleteParams = {
  id: string;
};

export const handler = ApiHandler(async (event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");
  const params = event.pathParameters;
  const { id } = params as ProductDeleteParams;
  const productId = parseInt(id, 10);
  await deleteProduct(productId);
  return {
    statusCode: 204,
  };
});
