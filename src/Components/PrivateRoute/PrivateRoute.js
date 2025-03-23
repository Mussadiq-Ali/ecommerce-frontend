import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("auth-token"); // ✅ Check user login status

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
