/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import logo from "../components/resources/face.png";
import logoInverted from "../components/resources/face-inverted.png";
import { Layout, Flex, Divider, Card, Typography } from "antd";
const { Footer: FooterAntd } = Layout;
import "../components/css/style.css"; // Update the path to your logo image
import Link from "antd/es/typography/Link";
import { useThemeStore } from "../stores/themeStore";
import PhoneOutlined from "@ant-design/icons/PhoneOutlined";

const Footer = () => {
  const { theme } = useThemeStore();
  return (
    <Card
      style={{
        margin: "30px 30px",
        overflow: "initial",
        borderRadius: "10px",
        boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Top section of the footer containing logo and nav links */}
      <Flex justify="space-between">
        <div className="footer-logo">
          <div className="profile-image mb-3 text-center">
            <img
              src={theme === "light" ? logo : logoInverted}
              alt="face"
              width="160"
            />
          </div>
        </div>
        <nav className="footer-nav d-flex justify-content-center">
          <a href="#" className="footer-link mx-2">
            HOME
          </a>
          <a href="#" className="footer-link mx-2">
            ABOUT US
          </a>
          <Typography.Text className="footer-link mx-2">
            <Link type="default" href="#">
              CONTACT US
            </Link>
          </Typography.Text>
        </nav>
      </Flex>
      <Divider style={{ margin: "0" }} />

      {/* Bottom section of the footer containing copyright and contact info */}
      <Flex justify="space-between" style={{ marginTop: 24 }}>
        <Typography.Text className="mb-0">
          &copy; 2024 Cogito Creatio. All rights reserved
        </Typography.Text>
        <Typography.Text className="d-flex align-items-center">
          <PhoneOutlined />
          <strong className="ms-2">(+63) 912 3456 789</strong>
        </Typography.Text>
      </Flex>
    </Card>
  );
};

export default Footer;
