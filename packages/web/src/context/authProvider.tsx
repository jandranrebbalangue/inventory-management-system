import React from "react";
import authContext from "./authContext";
import { API_TOKEN } from "../constants";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = React.useState<string>(() => {
    return localStorage.getItem(API_TOKEN) as string;
  });
  const login = (newToken: string) => {
    localStorage.setItem(API_TOKEN, newToken);
    setToken(newToken);
  };
  const logout = () => {
    localStorage.removeItem(API_TOKEN);
    setToken("");
  };

  React.useEffect(() => {
    const storedToken = localStorage.getItem(API_TOKEN) as string;
    if (token !== storedToken) {
      setToken(storedToken);
    }
  }, [token]);
  return (
    <authContext.Provider value={{ login, logout, token }}>
      {children}
    </authContext.Provider>
  );
};
export { AuthProvider };
