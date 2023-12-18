import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { ClipLoader } from "react-spinners";
import NotFound from "./NotFound";
import "./App.css";
import { AuthProvider } from "./context/authProvider";
import { ThemeProvider } from "./components/theme-provider";
import Dashboard from "./pages/Dashboard";
import { API_TOKEN } from "./constants";
import Login from "./pages/Login";
import EditProduct from "./products/EditProduct";

function App() {
  const routerPaths = [
    {
      path: "/",
      element: <Dashboard />,
      errorElement: <NotFound />,
      loader: async () => {
        const token = localStorage.getItem(API_TOKEN);
        if (token) {
          return { token };
        }
        return redirect("/signin");
      },
    },
    {
      path: "products/:productId/edit",
      element: <EditProduct />,
    },
    {
      path: "/oauth/google",
      loader: () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const signinToken = params.get("token");
        if (signinToken) {
          localStorage.setItem(API_TOKEN, signinToken);
        }

        return redirect("/");
      },
    },
    {
      path: "/signin",
      element: <Login />,
      errorElement: <NotFound />,
    },
    {
      path: "/signout",
      action: () => {
        localStorage.removeItem(API_TOKEN);
        return redirect("/signin");
      },
    },
  ];

  const router = createBrowserRouter(routerPaths);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <RouterProvider router={router} fallbackElement={<ClipLoader />} />
      </AuthProvider>
    </ThemeProvider>
  );
}
export default App;
