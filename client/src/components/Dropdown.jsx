/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import { Dropdown, Avatar, theme, Typography, Flex, Switch } from "antd";
import {
  SettingOutlined,
  LogoutOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import defaultPhoto from "./resources/default.png";
import { useThemeStore } from "../stores/themeStore";

const ProfileDropdown = ({ user }) => {
  const { logout } = useAuthStore();
  const { theme: themeData, toggleTheme } = useThemeStore();

  const handleLogout = () => {
    if (themeData === "dark") {
      toggleTheme();
    }
    logout();
  };

  const {
    token: { colorTextBase },
  } = theme.useToken();

  const items = [
    {
      key: "1",
      label: (
        <Flex justify="center" gap={10} align="center">
          {/* <Avatar src={user.photo} size="medium" /> */}
          <Flex>
            <Avatar
              src={
                user.photo
                  ? `http://localhost:3001/${user.photo}`
                  : defaultPhoto
              }
              size="large"
              style={{ border: "1px solid #ccc" }}
            />
          </Flex>
          <Flex vertical>
            <Typography.Text style={{ fontSize: 13, fontWeight: "bold" }}>
              {user.firstName + " " + user.lastName}
            </Typography.Text>
            <Typography.Text style={{ fontSize: 11 }}>
              {user.email}
            </Typography.Text>
            <Typography.Text style={{ fontSize: 11 }}>
              {user.role}
            </Typography.Text>
          </Flex>
        </Flex>
      ),
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      label: (
        <Link to="/profile" className="text-decoration-none">
          Account Settings
        </Link>
      ),
      icon: <SettingOutlined />,
      key: "2",
    },
    {
      label: (
        <Flex justify="space-between" gap={10} align="center">
          <Typography.Text>Dark Mode</Typography.Text>
          <Switch
            size="small"
            defaultChecked
            checked={themeData === "dark"} // Check based on current theme
            onChange={toggleTheme} // Toggle theme on change
          />
        </Flex>
      ),
      icon: <MoonOutlined style={{ color: colorTextBase }} />,
      key: "3",
      disabled: true,
    },
    {
      label: (
        <Link className="text-decoration-none" to="/" onClick={handleLogout}>
          Logout
        </Link>
      ),
      icon: <LogoutOutlined />,
      key: "4",
    },
  ];

  return (
    <Flex align="center" gap={10}>
      <Flex vertical style={{ padding: 0 }}>
        <Typography.Text className="fw-bold">{user.firstName}</Typography.Text>
        <Typography.Text type="secondary" style={{ fontSize: 11 }}>
          {user.role}
        </Typography.Text>
      </Flex>
      <Dropdown
        autoAdjustOverflow
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Avatar
          onClick={(e) => e.preventDefault()}
          src={
            user.photo ? `http://localhost:3001/${user.photo}` : defaultPhoto
          }
          size="large"
          style={{ border: "1px solid #ccc", cursor: "pointer" }}
        />
      </Dropdown>
    </Flex>
  );
};

export default ProfileDropdown;
