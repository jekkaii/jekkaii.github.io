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
// import AddStudent from "./components/AddStudent";
// import UploadClassPicture from "./components/UploadClassPicture";
import CreateClass from "./components/CreateClass";
import Header from "./components/admin/Header";
import Footer from "./components/admin/Footer";
import Test from "./components/Test";

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
      {/* <div>
        <Header />
        <Test />
        <Footer />
      </div> */}
      {/* <AddStudent></AddStudent>
      <UploadClassPicture></UploadClassPicture> */}

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
                <Home />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
