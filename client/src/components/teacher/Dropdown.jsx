import React, { useState, useEffect } from "react";
import { Dropdown, Avatar, Button, Typography, Flex } from "antd";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";

const ProfileDropdown = () => {
  const [userName, setUserName] = useState("John Doe"); // Default username for display
  const [userAvatar, setUserAvatar] = useState(null); // Placeholder for user image URL
  const [isHovered, setIsHovered] = useState(false); // State to track hover status
  const { logout, user } = useAuthStore();

  useEffect(() => {
    // Fetch user data (e.g., from local storage or an API) and update state
    const storedUserAvatar = localStorage.getItem("userAvatar"); // URL of user avatar if available
    setUserName(user.firstName + " " + user.lastName);
    setUserAvatar(storedUserAvatar);
  }, [user]);

  const handleLogout = () => {
    logout();
  };

  const items = [
    {
      label: (
        <Link to="/profile" className="text-decoration-none">
          Edit Profile
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="/" className="text-decoration-none" onClick={handleLogout}>
          Logout
        </Link>
      ),
      key: "1",
    },
  ];

  return (
    <Flex align="center" gap={5}>
      <Avatar
        src={userAvatar}
        size="large"
        icon={!userAvatar && <UserOutlined />}
      />
      <Flex vertical style={{ padding: 0 }}>
        <Typography.Text style={{ marginLeft: 8, marginRight: 8 }}>
          {userName}
        </Typography.Text>
        <Typography.Text
          style={{ marginLeft: 8, marginRight: 8, fontSize: 11 }}
        >
          {user.role}
        </Typography.Text>
      </Flex>
      <Dropdown
        menu={{
          items,
        }}
        trigger={["click"]}
      >
        <Button
          type="text"
          style={{
            alignItems: "center",
          }}
        >
          <DownOutlined />
        </Button>
      </Dropdown>
    </Flex>
  );
};

export default ProfileDropdown;
