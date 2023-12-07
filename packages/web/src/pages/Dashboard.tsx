import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import "../App.css";
import { useAuth } from "../context/auth";

const Dashboard = () => {
  const { login } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    if (searchParams.has("token")) {
      const token: string = searchParams.get("token") as string;
      login(token);
    }
    setSearchParams({});
  }, [login, searchParams, setSearchParams]);
  return <div>Dashboard</div>;
};

export default Dashboard;
