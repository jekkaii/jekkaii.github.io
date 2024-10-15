/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/css/style.css";
import faceImage from "../components/resources/face.png";
import faceImageInverted from "../components/resources/face-inverted.png";
import { useAuthStore } from "../stores/authStore";
import { Layout, Menu, Button, Flex, ConfigProvider, Divider } from "antd";
const { Sider } = Layout;
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FaHome, FaClipboardList, FaSignOutAlt } from "react-icons/fa";

function Sidebar() {
  const { isAdmin, isTeacher, logout } = useAuthStore(); // Include logout from authStore
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout(); // Call logout from the auth store
  };

  return (
    <>
      <ConfigProvider
        theme={
          theme === "dark"
            ? {
                token: {
                  colorPrimary: "#3628A3",
                  colorLink: "#2a1f7e",
                  colorLinkActive: "#2a1f7e",
                  colorLinkHover: "#2a1f7e",
                  colorText: "#ffffff",
                  colorBgContainer: "#141414",
                },
              }
            : {
                token: {
                  colorPrimary: "#3628A3",
                  colorLink: "#2a1f7e",
                  colorLinkActive: "#2a1f7e",
                  colorLinkHover: "#2a1f7e",
                  colorText: "gray",
                  colorBgContainer: "#ffffff",
                },
              }
        }
      >
        <Sider
          trigger={null}
          theme={theme}
          style={{
            margin: "20px 10px",
            borderRadius: "10px",
            boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.1)",
          }}
          collapsible
          collapsed={collapsed}
        >
          {/* Logo and toggle button */}
          <Flex vertical>
            <Flex
              gap={10}
              justify="center"
              align="middle"
              style={{ marginTop: 24, marginBottom: 24 }}
            >
              <img
                src={theme === "light" ? faceImage : faceImageInverted}
                alt="face"
                style={{
                  transition:
                    "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), display 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: collapsed ? "none" : "block",
                  width: collapsed ? 0 : 140,
                  overflow: "hidden",
                }}
              />
              <Button
                size={collapsed ? "large" : "small"}
                type="primary"
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? <RightOutlined /> : <LeftOutlined />}
              </Button>
            </Flex>

            <Flex style={{ margin: "10px 10px 20px 10px" }}>
              <Divider style={{ margin: 0 }} />
            </Flex>

            {/* Menu Items */}
            <Menu
              style={{
                padding: "10px 10px 0px 10px",
              }}
              theme={theme}
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <FaHome style={{ fontSize: "19px" }} />,
                  label: (
                    <Link className="text-decoration-none" to="/dashboard">
                      Home
                    </Link>
                  ),
                },
              ].concat(
                isTeacher && {
                  key: "2",
                  icon: <FaClipboardList style={{ fontSize: "19px" }} />,
                  label: (
                    <Link className="text-decoration-none" to="/teacher">
                      Manage Classes
                    </Link>
                  ),
                },
                isAdmin && {
                  key: "2",
                  icon: <FaClipboardList style={{ fontSize: "19px" }} />,
                  label: (
                    <Link className="text-decoration-none" to="/admin">
                      Manage Users
                    </Link>
                  ),
                },
                isAdmin && {
                  key: "3",
                  icon: <FaClipboardList style={{ fontSize: "19px" }} />,
                  label: (
                    <Link
                      className="text-decoration-none"
                      to="/admin/manage-models"
                    >
                      Manage Models
                    </Link>
                  ),
                }
              )}
            />

            {/* Divider and Logout Button */}
            <Flex style={{ margin: "10px 10px 0px 10px" }}>
              <Divider />
            </Flex>

            <Flex justify="center" style={{ padding: "10px 12px 10px 12px" }}>
              {/* Logout Button Styling */}
              <Button
                type="primary"
                icon={<FaSignOutAlt style={{ fontSize: "16px" }} />}
                onClick={handleLogout}
                style={{
                  display: "flex",
                  alignItems: "left",
                  justifyContent: "center",
                  transition: "width 0.6s",
                  whiteSpace: "nowrap",
                  ...(collapsed
                    ? { width: "50px", height: "auto", padding: "10px" }
                    : { width: "auto", height: "40px", padding: "10px 50px" }),
                }}
              >
                {!collapsed && "Logout"}
              </Button>
            </Flex>
          </Flex>
        </Sider>
      </ConfigProvider>
    </>
  );
}

export default Sidebar;
