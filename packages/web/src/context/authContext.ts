import React from "react";
interface AuthContextProps {
  login: (token: string) => void;
  logout: () => void;
  token: string;
}
const authContext = React.createContext<AuthContextProps>({
  login: () => { },
  logout: () => { },
  token: "",
});

export default authContext;
