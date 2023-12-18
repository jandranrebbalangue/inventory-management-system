import { ApiHandler } from "sst/node/api";
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

export const handler = ApiHandler(async (event) => {
  const session = useSession();
  if (session.type !== "user") throw new Error("Not authenticated");
  const productData = JSON.parse(event.body as string) as Product;
  const { productCode, productName, quantity } = productData;

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
