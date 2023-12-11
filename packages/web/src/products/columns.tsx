"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./product";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "productId",
    header: "Product Code",
  },
  {
    accessorKey: "productName",
    header: "Product",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
];
