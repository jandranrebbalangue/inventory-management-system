import { Button } from "@/components/ui/button";

const Login = () => {
  return (
    <>
      <Button>
        <a href={`${import.meta.env.VITE_API_ENDPOINT}/auth/google/authorize`}>
          Login with Google
        </a>
      </Button>
    </>
  );
};

export default Login;
