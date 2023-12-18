"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./product";
import { Link } from "react-router-dom";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "productCode",
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
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <>
          <Link to={`/products/${product.id}/edit`}>Edit Product</Link>
        </>
      );
    },
  },
];
