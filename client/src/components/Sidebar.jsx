/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import '../components/css/style.css';
import faceImage from '../components/resources/face.png';
import { FaHome, FaClipboardList, FaFileAlt } from 'react-icons/fa';

function Sidebar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <>
      <div className="d-flex flex-column p-3 min-vh-100">
        
      <div className="profile-image mb-3 text-center">
        <img src={faceImage} alt="face" width="160" />
      </div>

        <div className="profile-image mb-3 text-center">
        <img
            src="https://via.placeholder.com/100"
            alt="Profile"
            className="rounded-circle"
            width="80"
            height="80"></img>
        </div>

        <div className="user-section mb-3">
          <div className="user-info" onClick={toggleDropdown}>
            <div className="user-name">Juan Dela Cruz</div>
            <div className="user-role">Faculty</div>
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <a href="#">Edit Profile</a>
              <a href="#">Settings</a>
              <a href="#">Logout</a>
            </div>
          )}
        </div>

        <hr />


        <ul className="d-flex flex-column mb-auto list-unstyled">
          <li className="nav-item mb-1">
            <a href="#" className="px-3 py-2 nav-link active">
              <FaHome className="me-2" /> Home
            </a>
          </li>
          <li className="nav-item mb-1">
            <a href="../teacher/AttendanceTabs.jsx" className="px-3 py-2 nav-link">
              <FaClipboardList className="me-3" /> 
              <span className="attendance-text">Attendance</span> 
            </a>
          </li>
          <li className="nav-item mb-1">
            <a href="#" className="px-3 py-2 nav-link">
              <FaFileAlt className="me-4" /> 
              <span className="logs-text">Logs</span>
            </a>
          </li>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;
