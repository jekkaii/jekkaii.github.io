/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import logo from "../components/resources/face.png";

import "../components/css/style.css"; // Update the path to your logo image
import { Divider, Flex } from "antd";

export default class Footer extends Component {
  render() {
    return (
      <Flex
        vertical
        style={{
          margin: "30px 30px",
          padding: 24,
          background: "#fff",
          overflow: "initial",
          borderRadius: "10px",
          boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Top section of the footer containing logo and nav links */}
        <Flex justify="space-between">
          <div className="footer-logo">
            <div className="profile-image mb-3 text-center">
              <img src={logo} alt="face" width="160" />
            </div>
          </div>
          <nav className="footer-nav d-flex justify-content-center">
            <a href="#" className="footer-link mx-2">
              HOME
            </a>
            <a href="#" className="footer-link mx-2">
              ABOUT US
            </a>
            <a href="#" className="footer-link mx-2">
              CONTACT US
            </a>
          </nav>
        </Flex>
        <Divider style={{ margin: "0" }} />

        {/* Bottom section of the footer containing copyright and contact info */}
        <Flex justify="space-between" style={{ marginTop: 24 }}>
          <p className="mb-0">
            &copy; 2024 Cogito Creatio. All rights reserved
          </p>
          <div className="footer-contact d-flex align-items-center">
            <i className="headset-icon me-2"></i>
            <strong className="ms-2">(+63) 912 3456 789</strong>
          </div>
        </Flex>
      </Flex>
    );
  }
}
