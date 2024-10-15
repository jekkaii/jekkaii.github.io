/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/css/style.css";
import faceImage from "../components/resources/face.png";
import faceImageInverted from "../components/resources/face-inverted.png";
import { useAuthStore } from "../stores/authStore";
import {
  Layout,
  Menu,
  Button,
  Flex,
  ConfigProvider,
  Divider,
  Typography,
} from "antd";
const { Sider } = Layout;
import {
  LeftOutlined,
  RightOutlined,
  AppstoreOutlined,
  RobotOutlined,
  BookOutlined,
} from "@ant-design/icons";

function Sidebar() {
  const { isAdmin, isTeacher, logout } = useAuthStore(); // Include logout from authStore
  const [collapsed, setCollapsed] = useState(true);
  const [theme, setTheme] = useState("light");

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout(); // Call logout from the auth store
  };

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              collapsedIconSize: 17,
            },
          },
        }}
      >
        <Sider
          width={180}
          collapsedWidth={75}
          trigger={null}
          theme={theme}
          style={{
            boxShadow: "1px 0px 5px 0px rgba(0, 0, 0, 0.1)",
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
              style={{ marginTop: 24, marginBottom: 5 }}
            >
              <img
                src={theme === "light" ? faceImage : faceImageInverted}
                alt="face"
                style={{
                  transition:
                    "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), display 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  display: collapsed ? "none" : "block",
                  width: collapsed ? 0 : 100,
                  overflow: "hidden",
                }}
              />
              <Button
                size={collapsed ? "medium" : "small"}
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
              style={{ padding: "0 10px 0 10px" }}
              theme={theme}
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "1",
                  icon: <AppstoreOutlined />,
                  label: (
                    <Link className="text-decoration-none" to="/dashboard">
                      Dashboard
                    </Link>
                  ),
                },
              ].concat(
                isTeacher && {
                  key: "2",
                  icon: <BookOutlined />,
                  label: (
                    <Link className="text-decoration-none" to="/teacher">
                      Classes
                    </Link>
                  ),
                },
                isAdmin && {
                  key: "2",
                  icon: <BookOutlined />,
                  label: (
                    <Link className="text-decoration-none" to="/admin">
                      Manage Users
                    </Link>
                  ),
                },
                isAdmin && {
                  key: "3",
                  icon: <RobotOutlined />,
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
          </Flex>
        </Sider>
      </ConfigProvider>
    </>
  );
}

export default Sidebar;
