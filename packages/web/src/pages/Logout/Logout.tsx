import { useAuth } from "../../context/auth";

const Logout = () => {
  const { logout } = useAuth();
  return (
    <div>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Logout;
