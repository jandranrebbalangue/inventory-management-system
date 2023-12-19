"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Product } from "./product";
import { Link } from "react-router-dom";
import DeleteProduct from "./DeleteProduct";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Product
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
        <div className="flex">
          <div className="mr-2">
            <Link to={`/products/${product.id}/edit`}>Edit</Link>
          </div>
          <DeleteProduct productId={`${product.id}`} />
        </div>
      );
    },
  },
];
