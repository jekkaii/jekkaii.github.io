/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/css/style.css";
import faceImage from "../components/resources/face.png";
import faceImageInverted from "../components/resources/face-inverted.png";
import { useAuthStore } from "../stores/authStore";
import { useClassStore } from "../stores/classStore";
import { useStudentStore } from "../stores/studentStore";
import faceLogo from "../components/resources/face-logo-inverted.png";
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
  const { isAdmin, isTeacher, logout } = useAuthStore();
  const { getClasses, classes } = useClassStore();
  const { getStudents, students } = useStudentStore();
  const [selectedClass, setSelectedClass] = useState(null);

  const handleClick = (item) => {
    setSelectedClass(item.subject); // Update the state when the button is clicked
  };
  // Include logout from authStore
  const [collapsed, setCollapsed] = useState(true);
  const [theme, setTheme] = useState("light");

  const items = classes.map((item) => ({
    label: (
      <Link
        className="text-decoration-none"
        to={`/teacher/attendance/${item.classCode}`}
      >
        {item.classCode}
      </Link>
    ),
    key: item.classCode,
  }));

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  useEffect(() => {
    getStudents();
  }, [getStudents]);

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
                size={collapsed ? "large" : "small"}
                type="primary"
                style={{
                  margin: 0,
                  padding: "0px 4px",
                }}
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? (
                  <img
                    src={faceLogo}
                    style={{
                      transition:
                        "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), display 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: collapsed ? "block" : "none",
                      width: collapsed ? 35 : 0,
                      overflow: "hidden",
                    }}
                  />
                ) : (
                  <LeftOutlined />
                )}
              </Button>
            </Flex>

            <Flex
              style={{
                margin: collapsed ? "10px 0px 0px 0px" : "10px 10px 20px 10px",
              }}
            >
              <Divider style={{ margin: 0 }} />
            </Flex>

            {/* Menu Items */}
            <Menu
              style={{ padding: "0 10px 20px 10px" }}
              theme={theme}
              mode="inline"
              defaultSelectedKeys={["1"]}
              items={[
                {
                  key: "grp1",
                  type: "group",
                  label: (
                    <Typography.Text
                      style={{ margin: 0, padding: 0, color: "gray" }}
                    >
                      {collapsed ? null : "Overview"}
                    </Typography.Text>
                  ),
                  children: [
                    {
                      key: "1",
                      icon: <AppstoreOutlined />,
                      label: (
                        <Link className="text-decoration-none" to="/dashboard">
                          Dashboard
                        </Link>
                      ),
                    },
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
                    },
                  ].filter(Boolean),
                },
                !collapsed && {
                  key: "grp2",
                  label: (
                    <Typography.Text
                      style={{ margin: 0, padding: 0, color: "gray" }}
                    >
                      Classes
                    </Typography.Text>
                  ),
                  type: "group",
                  children: items,
                },
              ].filter(Boolean)}
            />
          </Flex>
        </Sider>
      </ConfigProvider>
    </>
  );
}

export default Sidebar;
