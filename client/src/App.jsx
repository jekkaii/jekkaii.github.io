/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useAuthStore } from "./stores/authStore";

import LoginForm from "./components/LoginForm";
import LogoutButton from "./components/LogoutButton";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import CreateClass from "./components/teacher/CreateClass";
import EditStudent from "./components/teacher/EditStudent";
import ManageUsers from "./components/admin/ManageUsers";
import Header from "./components/admin/Header";
import Footer from "./components/Footer";
import AddStudent from "./components/teacher/AddStudent";
import UploadClassPicture from "./components/teacher/UploadClassPicture";
import Profile from "./components/teacher/Profile";
import Sidebar from "./components/Sidebar";
import AttendanceTabs from "./components/teacher/AttendanceTabs";
import ClassList from "./components/teacher/ClassList";
import ManageStudents from "./components/teacher/ManageStudents";
import Confirmation from "./components/teacher/Confirmation";
import ManageModels from "./components/admin/ManageModels";
import SpinnerLoader from "./components/SpinnerLoader";
import Dash from "./components/teacher/Dash";

const ProtectedRoute = ({ children }) => {
  const { authenticated } = useAuthStore();
  if (!authenticated) {
    return <Navigate to="/" />;
  }
  return children;
};
const RedirectToHome = ({ children }) => {
  const { authenticated, isAdmin, isTeacher } = useAuthStore();

  if (authenticated) {
    if (isAdmin) {
      return <Navigate to="/admin" />;
    }
    if (isTeacher) {
      return <Navigate to="/teacher" />;
    }
  }

  return children;
};

function App() {
  const { checkAuthentication } = useAuthStore();
  const { isLoading, setLoading, authenticated } = useAuthStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <>
      {/* <div> */}
      {/* <Header /> */}
      {/* <div className="d-flex row h-100 w-100 overflow-hidden">
          <div className="d-flex col-2">
            <Sidebar />
          </div>
          <div className="col-10"> */}
      {/* Insert nyo under dito ung mga itetest nyong UI* or uncomment nyo lang */}
      {/* <Home></Home> */}
      {/* <CreateClass> </CreateClass> */}
      {/* <ManageUsers></ManageUsers> */}
      {/* <ManageModels></ManageModels> */}
      {/* <AddStudent></AddStudent> */}
      {/* <UploadClassPicture></UploadClassPicture> */}
      {/*<Profile></Profile>*/}
      {/* <AddUser></AddUser> */}
      {/* <EditUser></EditUser> */}
      {/* <AttendanceTabs></AttendanceTabs> */}
      {/* <ClassList></ClassList> */}

      {/* <Confirmation></Confirmation> */}
      {/* <AddStudent></AddStudent> */}
      {/* <ClassList></ClassList> */}
      {/* <ManageStudents></ManageStudents> */}
      {/* </div> */}
      {/* </div> */}
      {/* <Footer /> */}
      {/* </div>  */}
      <Router>
        <div className="container-fluid p-0">
          <div className="d-flex flex-row bd-highlight mb-3">
            {authenticated && <Sidebar />}
            {/* Main Content */}
            <div className="flex col">
              <Routes>
                {/* Login Route */}
                <Route
                  path="/"
                  element={
                    <RedirectToHome>
                      <LoginForm />
                    </RedirectToHome>
                  }
                ></Route>
                {/* Protected Routes */}
                {/* Teacher Routes */}
                <Route
                  path="/teacher"
                  element={
                    isLoading ? (
                      <SpinnerLoader />
                    ) : (
                      <ProtectedRoute>
                        <LogoutButton />
                        <ClassList />
                      </ProtectedRoute>
                    )
                  }
                ></Route>
                <Route
                  path="/teacher/attendance"
                  element={
                    isLoading ? (
                      <SpinnerLoader />
                    ) : (
                      <ProtectedRoute>
                        <AttendanceTabs />
                      </ProtectedRoute>
                    )
                  }
                ></Route>

                {/* Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    isLoading ? (
                      <SpinnerLoader />
                    ) : (
                      <ProtectedRoute>
                        <LogoutButton />
                        <ManageUsers />
                      </ProtectedRoute>
                    )
                  }
                ></Route>
              </Routes>
            </div>
          </div>
          {authenticated && <Footer />}
        </div>
      </Router>
    </>
  );
}

export default App;
