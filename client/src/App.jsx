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
import Footer from "./components/Footer";
import Sidebar from "./components/Sidebar";
import AttendanceTabs from "./components/teacher/AttendanceTabs";
import ClassList from "./components/teacher/ClassList";
import SpinnerLoader from "./components/SpinnerLoader";
import ProfileDropdown from "./components/teacher/Dropdown";
import Profile from "./components/teacher/Profile";
import { Layout, Switch, ConfigProvider, Flex, Typography } from "antd";
import Dashboard from "./components/Dashboard";
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
      console.log(isAdmin);
      return <Navigate to="/home" />;
    }
    if (isTeacher) {
      return <Navigate to="/home" />;
    }
  }

  return children;
};

function App() {
  const { checkAuthentication } = useAuthStore();
  const { isLoading, setLoading, authenticated, user } = useAuthStore();
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
            colorPrimary: "#2a1f7e",
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
          <Layout>
            <Layout>
              {/* Sidebar Component */}
              {authenticated && (
                <Sidebar
                  onChangeTheme={(value) => setTheme(value ? "dark" : "light")}
                />
              )}

              <Layout>
                {authenticated && (
                  <HeaderLayout
                    style={{
                      backgroundColor: "#ffffff",
                      minHeight: "110px",
                      padding: 0,
                    }}
                  >
                    <Flex
                      justify="space-between"
                      align="center"
                      style={{ height: "100%" }}
                    >
                      <Flex vertical style={{ padding: "20px" }}>
                        <Typography.Title
                          type="primary"
                          level={3}
                          style={{ margin: 0 }}
                        >
                          <small>Welcome,</small>
                          <span className="fw-bold"> {user.firstName}</span>
                        </Typography.Title>
                        <Typography.Text
                          type="secondary"
                          level={3}
                          style={{ margin: 0 }}
                        >
                          Lets take a look at your activity today
                        </Typography.Text>
                      </Flex>
                      <Flex
                        style={{ padding: "20px" }}
                        align="center"
                        justify="end"
                      >
                        <ProfileDropdown />
                      </Flex>
                    </Flex>
                  </HeaderLayout>
                )}
                {/* Main Content */}
                <Content
                  style={{
                    margin: "24px 16px 0",
                    padding: 24,
                    minHeight: 600,
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

                    {/* Profile Route */}
                    <Route
                      path="/profile"
                      element={
                        <ProtectedRoute>
                          <Profile />
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
                      path="/teacher/attendance/:code"
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
        </Router>
      </ConfigProvider>
    </>
  );
}

export default App;
