// useRoutePersistence.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useRoutePersistence = () => {
  const location = useLocation();

  useEffect(() => {
    // Store the current path in localStorage
    localStorage.setItem("lastVisitedRoute", location.pathname);
  }, [location]);
};

export default useRoutePersistence;
