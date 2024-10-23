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
import { useThemeStore } from "./stores/themeStore";
const { Content, Header: HeaderAntd } = Layout;

function App() {
  const { checkAuthentication } = useAuthStore();
  const { isLoading, setLoading, authenticated, user, isAdmin } =
    useAuthStore();

  const { theme } = useThemeStore(); // Get current theme from Zustand

  // useEffect(() => {
  //   restoreAuthentication(); // Check for token on load
  // }, [restoreAuthentication]);

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  const lightTheme = {
    colorPrimary: "#2a1f7e", // Primary Color
    colorBgBase: "#ffffff", // Base Background Color

    colorPrimaryBg: "#e2e0e5", // Primary Background Color
    colorLink: "#2a1f7e",
    colorLinkActive: "#2a1f7e",
    colorLinkHover: "#2a1f7e",
    colorTextBase: "#18124a", //Text Color
    colorBgContainer: "#ffffff",
  };

  const darkTheme = {
    colorPrimary: "#40347e",
    colorBgBase: "#010103",
    colorLink: "#e2e0e5",
    colorLinkActive: "#e2e0e5",
    colorLinkHover: "#e2e0e5",
    colorTextBase: "#e2e0e5",
    colorBgContainer: "#141414",
    colorBgElevated: "#141414",
    colorSplit: "#7b7a7a",

    // Change sidebar Color
    // colorPrimaryBg: "#2a1f7e",
  };

  return (
    <>
      <ConfigProvider
        theme={{
          token: theme === "dark" ? darkTheme : lightTheme,
        }}
      >
        <Router>
          {isLoading ? (
            <SpinnerLoader />
          ) : (
            <Layout>
              <Layout>
                {/* Sidebar Component */}
                {authenticated && <Sidebar />}

                <Layout>
                  {/* Header */}
                  {authenticated && <Header user={user} isAdmin={isAdmin} />}
                  {/* Main Content */}
                  <Content
                    style={{
                      margin: authenticated ? "30px 30px 0" : 0,
                      justifyContent: "center",
                      display: authenticated ? "block" : "flex",
                      overflow: "initial",
                      minHeight: "100vh",
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
