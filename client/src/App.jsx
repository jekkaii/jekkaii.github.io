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
import Footer from "./components/teacher/Footer";
import AddStudent from "./components/teacher/AddStudent";
import UploadClassPicture from "./components/teacher/UploadClassPicture";
import Profile from "./components/teacher/Profile";
import AddUser from "./components/admin/AddUser";
import Sidebar from "./components/Sidebar";
import EditUser from "./components/admin/EditUser";
import AttendanceTabs from "./components/teacher/AttendanceTabs";
import ClassList from "./components/teacher/ClassList";
import ManageStudents from "./components/teacher/ManageStudents";
import Confirmation from "./components/teacher/Confirmation";
import ManageModels from "./components/admin/ManageModels";

const TeacherRoute = ({ children }) => {
  const { authenticated, isAdmin, isTeacher } = useAuthStore();
  if (!isTeacher || !authenticated || isAdmin) {
    return <Navigate to="/" />;
  }
  return children;
};

const AdminRoute = ({ children }) => {
  const { authenticated, isAdmin, isTeacher } = useAuthStore();
  if (!isAdmin || !authenticated || isTeacher) {
    return <Navigate to="/" />;
  }
  return children;
};

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
  const { isAdmin } = useAuthStore();

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <>
      <div>
        {/* <Header /> */}
        <div className="d-flex row h-100 w-100 overflow-hidden">
          <div className="d-flex col-2">
            <Sidebar />
          </div>
          <div className="col-10">
      {/* Insert nyo under dito ung mga itetest nyong UI* or uncomment nyo lang */}
      {/* <Home></Home> */}
      {/*<CreateClass> </CreateClass>*/}
      {/* <ManageUsers></ManageUsers> */}
      {/* <AddStudent></AddStudent> */}
      {/* <UploadClassPicture></UploadClassPicture> */}
      {/* <Profile></Profile> */}
      {/* <AddUser></AddUser> */}
      {/* <EditUser></EditUser> */}
      {/* <AttendanceTabs></AttendanceTabs> */}
      {/* <ClassList></ClassList> */}

      {/* {<><ManageModels></ManageModels></>} */}

      {/* <Confirmation></Confirmation> */}
      {/* <AddStudent></AddStudent> */}
      {/* <ClassList></ClassList> */}
      {/* <ManageStudents></ManageStudents> */}
       </div>
      </div>
      <Footer />
      </div>  
{/* 
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
            path="/teacher"
            element={
              <ProtectedRoute>
                <TeacherRoute>
                  <Header />
                  <Home />
                  <AttendanceTabs />
                  <Footer />
                </TeacherRoute>
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminRoute>
                  <Header />
                  <Home />
                  <ManageUsers />
                  <Footer />
                </AdminRoute>
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router> */}
    </>
  );
}

export default App;
