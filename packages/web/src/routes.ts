import Dashboard from "./pages/Dashboard";
import ProductsDashboard from "./products";
import Login from "./pages/Login";

const routes = [
  {
    path: "/",
    name: "Home",
    element: Dashboard,
  },
  {
    path: "/login",
    name: "Login",
    exact: true,
    element: Login,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    exact: true,
    element: ProductsDashboard,
  },
];
export default routes;
