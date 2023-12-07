import React from "react";
import authContext from "./authContext";

const useAuth = () => {
  const context = React.useContext(authContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth };
