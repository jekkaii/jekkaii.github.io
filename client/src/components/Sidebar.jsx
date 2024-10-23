/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../components/css/style.css";
import faceImage from "../components/resources/face.png";
import faceImageInverted from "../components/resources/face-inverted.png";
import { useAuthStore } from "../stores/authStore";
import { useClassStore } from "../stores/classStore";
import { useThemeStore } from "../stores/themeStore";
import faceLogo from "../components/resources/face-logo-inverted.png";
import {
  Layout,
  Menu,
  Button,
  Flex,
  ConfigProvider,
  Divider,
  Typography,
  theme,
} from "antd";
const { Sider } = Layout;
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UsergroupAddOutlined,
  AppstoreOutlined,
  RobotOutlined,
  BookOutlined,
} from "@ant-design/icons";

function Sidebar() {
  const { isAdmin, isTeacher } = useAuthStore();
  const { readClasses, classes } = useClassStore();
  const { theme: themeData } = useThemeStore();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Include logout from authStore
  const [collapsed, setCollapsed] = useState(false);

  const items = classes.map((item) => ({
    label: (
      <Link
        className="text-decoration-none font-weight-bold m-0"
        to={`/teacher/attendance/${item.classCode}`}
      >
        {item.classCode}
      </Link>
    ),
    key: item.classCode,
  }));

  useEffect(() => {
    readClasses();
  }, [readClasses]);

  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              iconSize: 20,
              collapsedIconSize: 25,
              itemHeight: collapsed ? 50 : 45,
              itemMarginInline: 10,
              itemMarginBlock: 5,
              colorSplit: 0,
            },
          },
        }}
      >
        <Sider
          width={230}
          collapsedWidth={80}
          trigger={null}
          style={{
            boxShadow: "2px 0 1px 0 rgba(0, 0, 0, 0.05)",
            background: colorBgContainer,
          }}
          collapsible
          collapsed={collapsed}
        >
          {/* Logo and toggle button */}
          <Flex vertical>
            <Flex
              gap={10}
              justify="space-between"
              align="middle"
              style={{ margin: "15px 15px 0 15px" }}
            >
              <Flex align="middle" gap={10}>
                <Button
                  type="primary"
                  size="medium"
                  style={{
                    padding: "22px 5px",
                    borderRadius: "10px",
                    pointerEvents: collapsed ? "auto" : "none",
                  }}
                  onClick={() => setCollapsed(!collapsed)}
                >
                  <img
                    src={faceLogo}
                    style={{
                      transition:
                        "width 0.3s cubic-bezier(0.4, 0, 0.2, 1), display 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      display: collapsed ? "none" : "block",
                      width: 40,
                      overflow: "hidden",
                    }}
                  />
                  {collapsed && (
                    <MenuUnfoldOutlined
                      style={{ fontSize: "19px", color: "#f0c751", width: 40 }}
                      onClick={() => setCollapsed(!collapsed)}
                    />
                  )}
                </Button>

                <Flex
                  style={{
                    width: 100,
                    overflow: "hidden",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "width 0.5s ease-out, display 0.5s ease-out",
                  }}
                >
                  <img
                    src={themeData === "light" ? faceImage : faceImageInverted}
                    style={{
                      transition: "width 0.5s ease-out, display 0.5s ease-out",
                      display: collapsed ? "none" : "block",
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Flex>
              </Flex>
              {!collapsed && (
                <MenuFoldOutlined
                  style={{
                    fontSize: "19px",
                    color: "gray",
                    transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                  onClick={() => setCollapsed(!collapsed)}
                />
              )}
            </Flex>

            <Divider className="mb-0" />

            {/* Menu Items */}
            <Menu
              theme="light"
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
                      icon: (
                        <AppstoreOutlined
                          style={
                            collapsed
                              ? {
                                  marginLeft: -4,
                                  marginTop: 12,
                                }
                              : undefined
                          }
                        />
                      ),
                      label: (
                        <Link
                          className="text-decoration-none font-weight-bold m-0"
                          to="/dashboard"
                        >
                          Dashboard
                        </Link>
                      ),
                    },
                    isTeacher && {
                      key: "2",
                      icon: (
                        <BookOutlined
                          style={
                            collapsed
                              ? {
                                  marginLeft: -4,
                                  marginTop: 12,
                                }
                              : undefined
                          }
                        />
                      ),
                      label: (
                        <Link
                          className="text-decoration-none font-weight-bold m-0"
                          to="/teacher"
                        >
                          Classes
                        </Link>
                      ),
                    },
                    isAdmin && {
                      key: "2",
                      icon: (
                        <UsergroupAddOutlined
                          style={
                            collapsed
                              ? {
                                  marginLeft: -4,
                                  marginTop: 12,
                                }
                              : undefined
                          }
                        />
                      ),
                      label: (
                        <Link
                          className="text-decoration-none font-weight-bold m-0"
                          to="/admin"
                        >
                          Manage Users
                        </Link>
                      ),
                    },
                    isAdmin && {
                      key: "3",
                      icon: (
                        <RobotOutlined
                          style={
                            collapsed
                              ? {
                                  marginLeft: -4,
                                  marginTop: 12,
                                }
                              : undefined
                          }
                        />
                      ),
                      label: (
                        <Link
                          className="text-decoration-none font-weight-bold m-0"
                          to="/models"
                        >
                          Manage Models
                        </Link>
                      ),
                    },
                  ].filter(Boolean),
                },
                !collapsed &&
                  isTeacher && {
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
