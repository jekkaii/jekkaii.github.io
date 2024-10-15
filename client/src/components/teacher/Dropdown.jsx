import React, { useState, useEffect } from 'react';
import { Menu, Dropdown, Avatar, Button, Typography } from 'antd';
import { UserOutlined, DownOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('John Doe'); // Default username for display
  const [userAvatar, setUserAvatar] = useState(null); // Placeholder for user image URL

  useEffect(() => {
    // Fetch user data (e.g., from local storage or an API) and update state
    const storedUserName = localStorage.getItem('userName') || 'John Doe';
    const storedUserAvatar = localStorage.getItem('userAvatar'); // URL of user avatar if available
    setUserName(storedUserName);
    setUserAvatar(storedUserAvatar);
  }, []);

  const handleLogout = () => {
    // Clear any authentication data or session tokens here
    localStorage.removeItem('authToken'); // Example: clearing a token if you're using one

    // Redirect to the login page
    navigate('/'); // This will redirect to the login page as defined in the routes
  };

  const menu = (
    <Menu className="custom-dropdown-menu">
      <Menu.Item key="1" onClick={() => navigate('/profile')}>
        Edit Profile
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <Button type="text" style={{ display: 'flex', alignItems: 'center', padding: '5px' }}>
        <Avatar src={userAvatar} icon={!userAvatar && <UserOutlined />} />
        <Typography.Text style={{ marginLeft: 8, marginRight: 8 }}>{userName}</Typography.Text>
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default ProfileDropdown;
