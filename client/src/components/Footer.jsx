/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import logo from "../components/resources/face.png";

import "../components/css/style.css"; // Update the path to your logo image

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer">
        {/* Top section of the footer containing logo and nav links */}
        <div className="footer-top d-flex justify-content-between align-items-center py-3">
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
        </div>

        {/* Bottom section of the footer containing copyright and contact info */}
        <div className="footer-bottom d-flex justify-content-between align-items-center py-3 border-top">
          <p className="mb-0">
            &copy; 2024 Cogito Creatio. All rights reserved
          </p>
          <div className="footer-contact d-flex align-items-center">
            <i className="headset-icon me-2"></i>
            <strong className="ms-2">(+63) 912 3456 789</strong>
          </div>
        </div>
      </footer>
    );
  }
}
