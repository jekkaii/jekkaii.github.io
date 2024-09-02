/* eslint-disable no-unused-vars */
import React from "react";

function Sidebar() {
  return (
    <>
      <div className="d-flex flex-column p-3 min-vh-100">
        <div className="d-flex justify-content-center m-0">
          <h5>Admin</h5>
        </div>
        <hr />
        <ul className="d-flex nav-pills row mb-auto list-unstyled">
          <li className="nav-item mb-1">
            <a href="#" className="px-3 py-1 nav-link active">
              Home
            </a>
          </li>
          <li className="nav-item mb-1">
            <a href="#" className="px-3 py-1 nav-link">
              Manage Users
            </a>
          </li>
          <li className="nav-item mb-1">
            <a href="#" className="px-3 py-1 nav-link">
              Logs
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
