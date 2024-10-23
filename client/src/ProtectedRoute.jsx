/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";

export const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { authenticated } = useAuthStore();
  if (!authenticated) {
    // Redirect to the login page but save the current location to redirect back after login
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};
