/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../authentication/authStore";

const Home = () => {
  const { logout } = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div className="flex text-center p-4">
      <h1>Welcome, this is the homepage</h1>
      <br />

      <button onClick={handleLogout} className="btn btn-primary btn-lg">
        Logout
      </button>
    </div>
  );
};

export default Home;
