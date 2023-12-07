import React from "react";
import authContext from "./authContext";
import { API_KEY } from "../constants";
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const login = (token: string) => localStorage.setItem(API_KEY, token);
  const logout = () => localStorage.removeItem(API_KEY);
  const token = localStorage.getItem(API_KEY) as string;
  return (
    <authContext.Provider value={{ login, logout, token }}>
      {children}
    </authContext.Provider>
  );
};
export { AuthProvider };
