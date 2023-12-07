import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/auth";

const Login = () => {
  const { token } = useAuth();
  return (
    <>
      <a href={`${import.meta.env.VITE_API_ENDPOINT}/auth/google/authorize`}>
        <button>Login with Google</button>
      </a>

      {token && <Navigate to="/" replace={true} />}
    </>
  );
};

export default Login;
