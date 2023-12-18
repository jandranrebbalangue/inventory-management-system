import { ApiHandler, useJsonBody } from "sst/node/api";
import { useSession } from "sst/node/auth";
import {
  createProduct,
  findProductByCode,
} from "@inventory-management-system/core/db/entities/product";

type Product = {
  productCode: string;
  productName: string;
  quantity: number;
};

export const handler = ApiHandler(async (_event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");

  const { productCode, productName, quantity } = useJsonBody() as Product;
  const productExist = await findProductByCode(productCode);

  if (productExist) {
    return {
      statusCode: 409,
      body: JSON.stringify("Product already exist", null, 2),
    };
  } else {
    const data = {
      productName,
      productCode,
      quantity,
    };
    const productId = await createProduct(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ id: productId }),
    };
  }
});
