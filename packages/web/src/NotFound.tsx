import { useRouteError } from "react-router-dom";
import { RouteErrorType } from "./types";

export const ErrorPage = () => {
  const error = useRouteError() as RouteErrorType;
  return (
    <div id="error-page">
      <h4 className="pt-3">Oops! You&apos;re lost.</h4>
      <p className="text-muted float-left">
        The page you are looking for was not found.
      </p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
export default ErrorPage;
