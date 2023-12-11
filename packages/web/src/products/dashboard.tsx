import { columns } from "./columns";
import { DataTable } from "./data-table";
import { Product, products } from "./product";

function getData(): Product[] {
  // Fetch data from your API here.
  return products;
}

export default function Dashboard() {
  const data = getData();
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
