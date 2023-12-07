import routes from "./routes";
import NotFound from "./NotFound";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { ClipLoader } from "react-spinners";

function App() {
  const routerPaths = routes.map((item) => {
    return {
      path: item.path,
      element: <item.element />,
      errorElement: <NotFound />,
    };
  });
  const router = createBrowserRouter(routerPaths);

  return <RouterProvider router={router} fallbackElement={<ClipLoader />} />;
}
export default App;
