import React from 'react';
import Sidebar from '../Sidebar'; // Assuming Sidebar is a separate component
import ClassList from '../teacher/ClassList';
import '../css/style.css';

const TeacherDashboard = () => {
  return (
    <div className="dashboard-container">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content */}
      <div className="dashboard-content">
        {/* Add other components if needed */}
        <ClassList />
      </div>
    </div>
  );
};

export default TeacherDashboard;
