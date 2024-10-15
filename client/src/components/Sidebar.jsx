/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, props } from "react";
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
  Switch,
} from "antd";
const { Sider } = Layout;
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

import { FaHome, FaClipboardList, FaFileAlt } from "react-icons/fa";

function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAdmin, isTeacher } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const changeTheme = (value) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <>
      <ConfigProvider
        theme={
          theme === "dark"
            ? {
                token: {
                  // Seed Token
                  colorPrimary: "#3628A3",
                  colorLink: "#2a1f7e",
                  colorLinkActive: "#2a1f7e",
                  colorLinkHover: "#2a1f7e",
                  colorText: "#ffffff",

                  // Alias Token
                  colorBgContainer: "#141414",
                },
              }
            : {
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

            <Flex style={{ margin: "0px 10px 0px 10px" }}>
              <Divider style={{ margin: 0 }} />
            </Flex>

            {/* Menu Items */}
            <Menu
              style={{
                padding: "10px 10px 0px 10px",
              }}
              theme={theme}
              mode="inline"
              defaultSelectedKeys={["2"]}
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
            {/* Theme Toggle */}
            {/* 
            <Flex style={{ margin: "0px 10px 0px 10px" }}>
              <Divider />
            </Flex>

            <Flex vertical gap={5}>
              <Flex justify="center" gap={5}>
                {!collapsed && <SunFilled style={{ fontSize: "20px" }} />}
                <Switch onChange={changeTheme} />
                {!collapsed && <MoonFilled style={{ fontSize: "20px" }} />}
              </Flex>
            </Flex> */}
          </Flex>
        </Sider>
      </ConfigProvider>
      {/* Topbar with Profile Dropdown */}
      {/* <div className="d-flex justify-content-between align-items-center p-3">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            <FaUserCircle className="me-2" /> My Profile
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div> */}
    </>
  );
}

export default Sidebar;
