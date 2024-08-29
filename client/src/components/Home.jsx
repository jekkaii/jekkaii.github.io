/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../authentication/authStore";
import Sidebar from "./Sidebar";

const Home = () => {
  const { logout } = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };
  const location = useLocation();
  const user = location.state?.user;
  return (
    <>
      <container className="d-flex row h-100">
        <div className="d-flex col-3 h-max bg-info">
          <Sidebar />
        </div>
        <div className="col-9">
          <div className="flex text-center p-4">
            <h1>Welcome, this is the homepage</h1>
            <br />

            <button onClick={handleLogout} className="btn btn-primary btn-lg">
              Logout
            </button>
          </div>
        </div>
      </container>
    </>
  );
};

export default Home;
