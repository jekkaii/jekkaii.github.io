/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
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

export const IsLoggedInContext = createContext();
export const SetIsLoggedInContext = createContext();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:3001/user", { withCredentials: true })
      .then((response) => {
        console.log(response.data.user);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);
  return (
    <>
      {/* <div>
        <Header />
        <Test />
        <Footer />
      </div> */}
      {/* <AddStudent></AddStudent>
      <UploadClassPicture></UploadClassPicture> */}
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <SetIsLoggedInContext.Provider value={setIsLoggedIn}>
          <Router>
            <Routes>
              <Route
                path="/"
                element={isLoggedIn ? <Navigate to="/home" /> : <LoginForm />}
              ></Route>
              <Route
                path="/signup"
                element={isLoggedIn ? <Navigate to="/home" /> : <SignUp />}
              ></Route>
              <Route
                path="/home"
                element={isLoggedIn ? <Home /> : <Navigate to="/" />}
              ></Route>
            </Routes>
          </Router>
        </SetIsLoggedInContext.Provider>
      </IsLoggedInContext.Provider>
    </>
  );
}

export default App;
