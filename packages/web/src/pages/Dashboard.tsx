import { useEffect, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/auth";
import { DataTable } from "@/products/data-table";
import { columns } from "@/products/columns";
import { ModeToggle } from "@/components/mode-toggle";
import { Product } from "@/products/product";
import Modal from "@/components/Dialog";
import get from "@/api/get";
import { Toaster } from "@/components/ui/toaster";

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
      const products = (await get({ apiName: "/products" })) as Product[];
      if (cancel) return;
      setProducts(products);
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
        <Modal label="Add Product" />
        <Toaster />
      </div>
      <DataTable columns={columns} data={products} />
      {!token && <Navigate to="/login" replace={true} />}
    </div>
  );
};

export default Dashboard;
