/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import axios from "axios";
import { useAuthStore } from "../stores/authStore.js";
import Sidebar from "./Sidebar.jsx";

const Home = () => {
  const { logout } = useAuthStore();
  const { isAdmin } = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  // const location = useLocation();
  // const user = location.state?.user;
  return (
    <>
      <div className="flex text-center p-5">
        <h1>
          {isAdmin
            ? "Admin Account for reference"
            : "Teacher Account for reference"}
        </h1>
        <br />
        <button onClick={handleLogout} className="btn btn-primary btn-lg">
          Logout
        </button>
      </div>
    </>
  );
};

export default Home;
