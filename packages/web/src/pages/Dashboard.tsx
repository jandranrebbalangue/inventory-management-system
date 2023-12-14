import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import useSWR from "swr";
import "../App.css";
import { useAuth } from "../context/auth";
import { DataTable } from "@/products/data-table";
import { columns } from "@/products/columns";
import { ModeToggle } from "@/components/mode-toggle";
import { Product } from "@/products/product";
import Modal from "@/components/Dialog";
import { Toaster } from "@/components/ui/toaster";
import { fetcher } from "@/utils/fetcher";
import { ClipLoader } from "react-spinners";

const Dashboard = () => {
  const { login, token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading } = useSWR<Product[]>("/products", fetcher);

  useEffect(() => {
    const tokenExist = searchParams.has("token");
    if (tokenExist) {
      const token = searchParams.get("token") as string;
      login(token);
    }
    setSearchParams({});
  }, [login, searchParams, setSearchParams]);

  if (isLoading) return <ClipLoader />;

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-end space-x-2 py-4">
        <ModeToggle />
        <Modal label="Add Product" />
        <Toaster />
      </div>
      <DataTable columns={columns} data={data as Product[]} />
      {!token && <Navigate to="/login" replace={true} />}
    </div>
  );
};

export default Dashboard;
