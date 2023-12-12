import { ApiHandler } from "sst/node/api";
import { useSession } from "sst/node/auth";
import { updateProduct } from "@inventory-management-system/core/db/entities/product";

type Product = {
  productCode: string;
  productName: string;
  quantity: number;
};

type ProductUpdateParams = {
  id: string;
};

export const handler = ApiHandler(async (event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");
  const productData = JSON.parse(event.body as string) as Product;
  const { productCode, productName, quantity } = productData;

  const params = event.pathParameters;
  const { id } = params as ProductUpdateParams;
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
