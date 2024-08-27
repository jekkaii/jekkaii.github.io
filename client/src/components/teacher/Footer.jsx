/* eslint-disable no-unused-vars */
import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="footer fixed-bottom bg-primary">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="colcontainer-fluid m-4 w-100">
            <h4 className="d-flex justify-content-center">
              Footer<strong> 2024</strong>
            </h4>
          </div>
        </nav>
      </footer>
    );
  }
}
