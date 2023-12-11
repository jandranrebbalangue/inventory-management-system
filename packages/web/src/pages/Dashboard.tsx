import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/auth";
import { DataTable } from "@/products/data-table";
import { columns } from "@/products/columns";
import { products } from "@/products/product";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { login, token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const tokenExist = searchParams.has("token");
    if (tokenExist) {
      const token = searchParams.get("token") as string;
      login(token);
    }
    setSearchParams({});
  }, [login, searchParams, setSearchParams]);

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
