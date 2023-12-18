import useSWR from "swr";
import "../App.css";
import { DataTable } from "@/products/data-table";
import { columns } from "@/products/columns";
import { ModeToggle } from "@/components/mode-toggle";
import { Product } from "@/products/product";
import AddProduct from "@/products/AddProduct";
import { Toaster } from "@/components/ui/toaster";
import { fetcher } from "@/utils/fetcher";
import { ClipLoader } from "react-spinners";
import { useLoaderData } from "react-router-dom";
import { User } from "../../../core/src/db/schema/users";

interface getToken {
  token: User;
}

const Dashboard = () => {
  const { token } = useLoaderData() as getToken;
  const { data, isLoading } = useSWR<Product[]>(
    ["/products", token],
    ([url, token]) => fetcher(url, token),
  );

  console.log({ isLoading });

  if (isLoading) return <ClipLoader />;

  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-end space-x-2 py-4">
        <ModeToggle />
        <AddProduct label="Add Product" />
        <Toaster />
      </div>
      <DataTable columns={columns} data={data as Product[]} />
      {/* {!token && <Navigate to="/login" replace={true} />} */}
    </div>
  );
};

export default Dashboard;
