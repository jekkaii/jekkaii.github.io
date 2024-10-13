import React from "react";
import Sidebar from "../Sidebar"; // Assuming Sidebar is a separate component
import ClassList from "../teacher/ClassList";
import "../css/style.css";
import { useAuthStore } from "../../stores/authStore";
import Footer from "../Footer";

const TeacherDashboard = () => {
  const { logout } = useAuthStore();
  const { isAdmin } = useAuthStore();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
  };

  return (
    <>
      <div className="container-fluid">
        {/* Sidebar Component */}
        <div className="d-flex flex-row bd-highlight mb-3">
          <Sidebar />
          {/* Main Content */}
          <div className="flex col">
            <ClassList />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default TeacherDashboard;
