import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/auth";
import { DataTable } from "@/products/data-table";
import { columns } from "@/products/columns";
/* import { products } from "@/products/product"; */
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Product } from "@/products/product";
import { API_TOKEN } from "@/constants";

const Dashboard = () => {
  const { login, token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>(() => {
    return [
      {
        id: 0,
        productName: "",
        productCode: "",
        quantity: 0,
      },
    ];
  });

  useEffect(() => {
    const tokenExist = searchParams.has("token");
    if (tokenExist) {
      const token = searchParams.get("token") as string;
      login(token);
    }
    setSearchParams({});
  }, [login, searchParams, setSearchParams]);

  useEffect(() => {
    let cancel = false;
    const getProducts = async () => {
      const token = localStorage.getItem(API_TOKEN);
      const res = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      const productss = await res.json();
      console.log({ productss });
      if (cancel) return;
      setProducts(productss);
    };
    getProducts();
    return () => {
      cancel = true;
    };
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-end space-x-2 py-4">
        <ModeToggle />
        <Button>Add Product</Button>
      </div>
      <DataTable columns={columns} data={products} />
      {!token && <Navigate to="/login" replace={true} />}
    </div>
  );
};

export default Dashboard;
