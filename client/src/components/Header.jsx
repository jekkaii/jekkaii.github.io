/* eslint-disable no-unused-vars */
import React, { Component } from "react";
import logo from "../components/resources/face.png";
import "../components/css/style.css"; // Update the path to your logo image

export default class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="colcontainer-fluid m-4 w-100">
            <div className="row">
              <div className="col d-flex">
                <img src={logo} alt="face" width="160" />
              </div>
              <div className="col d-flex justify-content-end">
                <h4>My Account Dropdown</h4>
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}
