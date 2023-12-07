import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import routes from "./routes";
import NotFound from "./NotFound";
import "./App.css";
import { AuthProvider } from "./context/authProvider";

function App() {
  const routerPaths = routes.map((item) => {
    return {
      path: item.path,
      element: <item.element />,
      errorElement: <NotFound />,
    };
  });
  const router = createBrowserRouter(routerPaths);

  return (
    <AuthProvider>
      <RouterProvider router={router} fallbackElement={<ClipLoader />} />
    </AuthProvider>
  );
}
export default App;
