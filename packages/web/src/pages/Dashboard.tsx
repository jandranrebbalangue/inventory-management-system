import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../App.css";

const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has("token")) {
      localStorage.setItem("API_TOKEN", searchParams.get("token") as string);
    }
    setSearchParams({});
  }, [searchParams, setSearchParams]);
  return <div>Dashboard</div>;
};

export default Dashboard;
