/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { SetIsLoggedInContext } from "../App";

const Home = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3001/api/auth/logout",
        {
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        setIsLoggedIn(false);

        navigate("/");
      }
    } catch (err) {
      if (err.status === 400) {
        console.log("Error logging out:", err);
      }
    }
  };
  const location = useLocation();
  const user = location.state?.user;
  return (
    <div className="flex text-center p-4">
      <h1>
        Welcome <strong>{user && user.name}</strong>, This is the homepage
      </h1>
      <br />

      <button onClick={handleLogout} className="btn btn-primary btn-lg">
        Logout
      </button>
    </div>
  );
};

export default Home;
