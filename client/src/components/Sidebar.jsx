/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../components/css/style.css";
import faceImage from "../components/resources/face.png";
import { useAuthStore } from "../stores/authStore";
import {
  FaHome,
  FaClipboardList,
  FaFileAlt,
  FaUserCircle,
} from "react-icons/fa";

function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { isAdmin, isTeacher } = useAuthStore();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      {/* Topbar with Profile Dropdown
      <div className="d-flex justify-content-between align-items-center p-3">
        <div className="dropdown">
          <button
            className="btn btn-secondary dropdown-toggle"
            type="button"
            onClick={toggleDropdown}
            aria-expanded={dropdownOpen}
          >
            <FaUserCircle className="me-2" /> My Profile
          </button>
          {dropdownOpen && (
            <ul className="dropdown-menu dropdown-menu-right">
              <li>
                <a className="dropdown-item" href="#">
                  Profile
                </a>
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Settings
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a className="dropdown-item" href="#">
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div> */}

      <div className="d-flex flex-column p-3 min-vh-100 hv-100">
        <div className="profile-image mb-3 text-center">
          <img src={faceImage} alt="face" width="160" />
        </div>

        <hr />

        <ul className="d-flex flex-column mb-auto list-unstyled">
          {isAdmin ? (
            <>
              <li className="nav-item mb-1">
                <Link to="/admin" className="px-3 py-2 nav-link active">
                  <FaUserCircle className="me-2" />
                  <span className="manage-users-text">Manage Users</span>
                </Link>
              </li>
            </>
          ) : isTeacher ? (
            <>
              <li className="nav-item mb-1">
                <Link to="/teacher" className="px-3 py-2 nav-link active">
                  <FaHome className="me-2" />
                  Home
                </Link>
              </li>
              <li className="nav-item mb-1">
                <Link to="/teacher/attendance" className="px-3 py-2 nav-link">
                  <FaClipboardList className="me-3" />
                  <span className="attendance-text">Attendance</span>
                </Link>
              </li>
            </>
          ) : (
            <></>
          )}
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
