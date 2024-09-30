import React, { useState } from 'react';
import '../css/style.css';
import { FaArchive, FaTrash, FaBars } from 'react-icons/fa';
import Confirmation from './Confirmation'; // Import the Confirmation component

const ClassList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleActionClick = (action, classCode) => {
    if (action === 'archive') {
      setModalMessage(`Are you sure you want to archive the class of ${classCode}?`);
    } else if (action === 'delete') {
      setModalMessage(`Are you sure you want to delete the class of ${classCode}?`);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  const confirmAction = () => {
    // Handle the confirmed action (archive or delete)
    console.log(modalMessage);
    closeModal();
  };

  return (
    <div className="class-list-container">
      {/* User Avatar */}
      <div className="user-avatar">
        <div className="avatar-initials">JD</div>
      </div>

      {/* Main Heading */}
      <div className="heading-container">
        <h1>All Classes</h1>
        <p>Here are the list of the classes you handle</p>
      </div>

      {/* Create Class and Hamburger Menu Button */}
      <div className="menu-create-btn-container">
        <FaBars className="hamburger-menu" />
        <button className="create-class-btn">+ Create Class</button>
      </div>

      {/* Class Section */}
      <div className="class-section">
        <h2>IT 221 (Information Management)</h2>

        {/* Class Cards */}
        <div className="class-cards">
          <div className="class-card card-1">
            <div className="class-info">
              <p>CLASSCODE: 9552</p>
              <p>Room: D515</p>
              <p>Schedule: MWF 11:30 - 12:30</p>
              <button className="visit-class-btn">Visit Class</button>
            </div>
            <div className="class-actions">
              <FaArchive className="archive-icon" onClick={() => handleActionClick('archive', 'IT221 - 9552')} />
              <FaTrash className="trash-icon" onClick={() => handleActionClick('delete', 'IT221 - 9552')} />
            </div>
          </div>

          <div className="class-card card-2">
            <div className="class-info">
              <p>CLASSCODE: 9553</p>
              <p>Room: D515</p>
              <p>Schedule: MWF 11:30 - 12:30</p>
              <button className="visit-class-btn">Visit Class</button>
            </div>
            <div className="class-actions">
              <FaArchive className="archive-icon" onClick={() => handleActionClick('archive', 'IT221 - 9553')} />
              <FaTrash className="trash-icon" onClick={() => handleActionClick('delete', 'IT221 - 9553')} />
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Confirmation
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={confirmAction}
        message={modalMessage}
      />
    </div>
  );
};

export default ClassList;
