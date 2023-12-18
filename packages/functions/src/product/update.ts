import { ApiHandler, useJsonBody, usePathParam } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { updateProduct } from "@inventory-management-system/core/db/entities/product";

type Product = {
  productCode: string;
  productName: string;
  quantity: number;
};

export const handler = ApiHandler(async (_event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");
  const { productName, productCode, quantity } = useJsonBody() as Product;
  const id = usePathParam("id") as string;
  const productId = parseInt(id, 10);
  await updateProduct({
    productId,
    productCode,
    productName,
    quantity,
  });
  return {
    statusCode: 204,
  };
});
