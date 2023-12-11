import { useEffect } from "react";
import { Navigate, useSearchParams } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/auth";
import { DataTable } from "@/products/data-table";
import { columns } from "@/products/columns";
import { products } from "@/products/product";

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
      <DataTable columns={columns} data={products} />
      {!token && <Navigate to="/login" replace={true} />}
    </div>
  );
};

export default Dashboard;
