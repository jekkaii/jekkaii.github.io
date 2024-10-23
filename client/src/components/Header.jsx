/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import "../components/css/style.css"; // Update the path to your logo image
import { Layout, Flex, Typography } from "antd";
const { Header: HeaderAntd } = Layout;
import ProfileDropdown from "./Dropdown";

export default class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <HeaderAntd
        style={{
          backgroundColor: "#ffffff",
          minHeight: "110px",
          padding: 0,
        }}
      >
        <Flex justify="space-between" align="center" style={{ height: "100%" }}>
          <Flex vertical style={{ padding: "20px" }}>
            <Typography.Title type="primary" level={3} style={{ margin: 0 }}>
              <small>Welcome,</small>
              <span className="fw-bold"> {user.firstName}</span>
            </Typography.Title>
            <Typography.Text type="secondary" level={3} style={{ margin: 0 }}>
              Lets take a look at your activity today
            </Typography.Text>
          </Flex>
          <Flex style={{ padding: "20px" }} align="center" justify="end">
            <ProfileDropdown user={user} />
          </Flex>
        </Flex>
      </HeaderAntd>
    );
  }
}
