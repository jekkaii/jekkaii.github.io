/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./authentication/authStore";

import LoginForm from "./components/LoginForm";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import CreateClass from "./components/CreateClass";
import ManageUsers from "./components/admin/ManageUsers";
import Header from "./components/admin/Header";
import Footer from "./components/admin/Footer";
import AddStudent from "./components/teacher/AddStudent";
import UploadClassPicture from "./components/teacher/UploadClassPicture";
import ViewAttendanceLink from "./components/teacher/ViewAttendanceLink";
import Profile from "./components/teacher/Profile";
import AttendanceHistory from "./components/teacher/AttendanceHistory";
import AddUser from "./components/admin/AddUser"

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useAuthStore();
  if (!authenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

const RedirectToHome = ({ children }) => {
  const { authenticated } = useAuthStore();

  if (authenticated) {
    return <Navigate to="/home" />;
  }
  return children;
};

function App() {
  const { checkAuthentication } = useAuthStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <>
      <div>
        <Header />
        <Footer />
      </div> */}
      {/*<CreateClass> </CreateClass>*/}
      {/*<AttendanceHistory></AttendanceHistory>*/}
      {/*<ManageUsers></ManageUsers>**/}
      {/* <AddStudent></AddStudent> */}
      {/* <UploadClassPicture></UploadClassPicture> */}
      {/* <ViewAttendanceLink></ViewAttendanceLink> */}
      {/* <Profile></Profile> */}
      <AddUser></AddUser>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectToHome>
                <LoginForm />
              </RedirectToHome>
            }
          ></Route>
          <Route
            path="/signup"
            element={
              <RedirectToHome>
                <SignUp />
              </RedirectToHome>
            }
          ></Route>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Header />
                <Home />
                <Footer />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
