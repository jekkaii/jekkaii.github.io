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
import ManageUsers from "./components/admin/ManageUsers";
import Header from "./components/admin/Header";
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import AttendanceTabs from "./components/teacher/AttendanceTabs";
import ClassList from "./components/teacher/ClassList";
import SpinnerLoader from "./components/SpinnerLoader";
import { Layout, Switch, ConfigProvider, Flex } from "antd";
const { Content, Header: HeaderLayout } = Layout;

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
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    checkAuthentication();
  }, [checkAuthentication]);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#3628A3",
            colorLink: "#2a1f7e",
            colorLinkActive: "#2a1f7e",
            colorLinkHover: "#2a1f7e",
            colorText: "gray",

            // Alias Token
            colorBgContainer: "#ffffff",
          },
        }}
      >
        <Router>
          <Layout>
            {authenticated && (
              <HeaderLayout
                style={{ backgroundColor: "#ffffff" }}
              ></HeaderLayout>
            )}
            <Layout>
              {/* Sidebar Component */}
              {authenticated && (
                <Sidebar
                  onChangeTheme={(value) => setTheme(value ? "dark" : "light")}
                />
              )}
              <Layout>
                {/* Main Content */}
                <Content
                  style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                    background: "#fff",
                    overflow: "initial",
                    borderRadius: "10px",
                    boxShadow: "5px 5px 10px 0px rgba(0, 0, 0, 0.1)",
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
                    {/* Protected Routes */}
                    {/* Teacher Routes */}
                    <Route
                      path="/teacher"
                      element={
                        <ProtectedRoute>
                          <LogoutButton />
                          <ClassList />
                        </ProtectedRoute>
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
                        <ProtectedRoute>
                          <LogoutButton />
                          <ManageUsers />
                        </ProtectedRoute>
                      }
                    ></Route>
                    <Route
                      path="*"
                      element={<Navigate to="/" replace />}
                    ></Route>
                  </Routes>
                </Content>
              </Layout>
            </Layout>
            {authenticated && <Footer />}
          </Layout>
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
