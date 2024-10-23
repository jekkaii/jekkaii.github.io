/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "./stores/authStore";

export const RedirectToHome = ({ children }) => {
  const { isAdmin, isTeacher, authenticated } = useAuthStore();
  const location = useLocation();

  // Only redirect to "/home" if the user is authenticated and on the root ("/")
  if (authenticated && location.pathname === "/") {
    if (isAdmin || isTeacher) {
      return <Navigate to="/home" replace />;
    }
  }

  // If not on the root path, don't redirect; allow the component to load or refresh normally
  return children;
};
