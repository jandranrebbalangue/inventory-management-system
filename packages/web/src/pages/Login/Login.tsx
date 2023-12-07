const Login = () => {
  return (
    <a href={`${import.meta.env.VITE_API_ENDPOINT}/auth/google/authorize`}>
      <button>Login with Google</button>
    </a>
  );
};

export default Login;
