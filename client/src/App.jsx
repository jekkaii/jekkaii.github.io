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
import { useEffect, useState } from "react";
import ManageUsers from "./components/admin/ManageUsers";
import ManageModels from "./components/admin/ManageModels";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import AttendanceTabs from "./components/teacher/AttendanceTabs";
import ClassList from "./components/teacher/ClassList";
import SpinnerLoader from "./components/SpinnerLoader";
import Profile from "./components/Profile";
import { Layout, ConfigProvider, Flex, Typography } from "antd";
import Dashboard from "./components/Dashboard";
import { ProtectedRoute } from "./ProtectedRoute";
import { RedirectToHome } from "./RedirectToHome";
import Header from "./components/Header";
const { Content } = Layout;

function App() {
  const { checkAuthentication, restoreAuthentication } = useAuthStore();
  const { isLoading, setLoading, authenticated, user, isAdmin } =
    useAuthStore();

  const [theme, setTheme] = useState("light");

  // useEffect(() => {
  //   if (user) {
  //     setLoading(false);
  //   }
  // }, [user, setLoading]);

  // useEffect(() => {
  //   restoreAuthentication(); // Check for token on load
  // }, [restoreAuthentication]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#2a1f7e",
            colorPrimaryBg: "#e2e0e5",
            colorLink: "#2a1f7e",
            colorLinkActive: "#2a1f7e",
            colorLinkHover: "#2a1f7e",
            colorText: "#010103",
            colorTextSecondary: "gray",

            // Alias Token
            colorBgContainer: "#ffffff",
          },
        }}
      >
        <Router>
          {isLoading ? (
            <SpinnerLoader />
          ) : (
            <Layout>
              <Layout>
                {/* Sidebar Component */}
                {authenticated && (
                  <Sidebar
                    onChangeTheme={(value) =>
                      setTheme(value ? "dark" : "light")
                    }
                  />
                )}

                <Layout>
                  {/* Header */}
                  {authenticated && (
                    <Header
                      user={user}
                      isAdmin={isAdmin}
                      onChangeTheme={(value) =>
                        setTheme(value ? "dark" : "light")
                      }
                    />
                  )}
                  {/* Main Content */}
                  <Content
                    style={{
                      margin: authenticated ? "30px 30px 0" : 0,
                      justifyContent: "center",
                      display: authenticated ? "block" : "flex",
                      background: !authenticated ? "white" : "none",
                      overflow: "initial",
                      // borderRadius: "30px",
                      // boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.1)",
                    }}
                  >
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

                      {/* Profile Route */}
                      <Route
                        path="/profile"
                        element={
                          <ProtectedRoute>
                            <Profile user={user} isAdmin={isAdmin} />
                          </ProtectedRoute>
                        }
                      ></Route>

                      {/* Dashboard Route */}
                      <Route
                        path="/home"
                        element={
                          <ProtectedRoute>
                            <Dashboard />
                          </ProtectedRoute>
                        }
                      ></Route>

                      {/* Teacher Routes */}
                      <Route
                        path="/teacher"
                        element={
                          <ProtectedRoute>
                            <ClassList />
                          </ProtectedRoute>
                        }
                      ></Route>

                      <Route
                        path="/teacher/attendance/:classcode"
                        element={
                          <ProtectedRoute>
                            <AttendanceTabs />
                          </ProtectedRoute>
                        }
                      ></Route>

                      {/* Logout Route */}
                      <Route
                        path="/"
                        element={
                          <RedirectToHome>
                            <LoginForm />
                          </RedirectToHome>
                        }
                      ></Route>

                      {/* Admin Routes */}
                      <Route
                        path="/admin"
                        element={
                          <ProtectedRoute>
                            <ManageUsers />
                          </ProtectedRoute>
                        }
                      ></Route>

                      {/* Model Routes */}
                      <Route
                        path="/models"
                        element={
                          <ProtectedRoute>
                            <ManageModels />
                          </ProtectedRoute>
                        }
                      ></Route>
                      <Route
                        path="*"
                        element={<Navigate to="/" replace />}
                      ></Route>
                    </Routes>
                  </Content>
                  {authenticated && <Footer />}
                </Layout>
              </Layout>
            </Layout>
          )}
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
