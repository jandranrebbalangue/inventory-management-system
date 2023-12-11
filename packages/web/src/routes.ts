import Dashboard from "./pages/Dashboard";
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
];
export default routes;
