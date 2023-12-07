/* import { redirect } from "react-router-dom"; */
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    name: "Home",
    element: Dashboard,
  },
  {
    path: "/Login",
    name: "Login",
    exact: true,
    element: Login,
  },
];
export default routes;
