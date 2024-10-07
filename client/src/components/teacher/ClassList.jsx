import React, { useState, useEffect } from 'react';
import '../css/style.css';
import { FaArchive, FaTrash, FaBars } from 'react-icons/fa';
import Confirmation from './Confirmation'; // Import the Confirmation component

const ClassList = () => {
  const [classes, setClasses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedAction, setSelectedAction] = useState('');
  const [selectedClass, setSelectedClass] = useState(null);

  // Fetch class details from the database when component mounts
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Uncomment below to fetch real data from your API
        // const response = await fetch('/api/getClasses?professor=Cruz');
        // const data = await response.json();
        // setClasses(data.classes); 

        // Sample data (you can comment this out and replace it with actual fetch)
        const sampleClasses = [
          {
            subject: 'Information Management',
            classCode: 'IT221',
            classCodes: ['9552', '9553'],
            room: 'D515',
            schedule: 'MWF 11:30 - 12:30'
          },
          {
            subject: 'IT Security',
            classCode: 'IT322',
            classCodes: ['9541', '9542'],
            room: 'D512',
            schedule: 'TTh 10:00 - 11:30'
          }
        ];
        setClasses(sampleClasses);

      } catch (error) {
        console.error('Error fetching class data:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleActionClick = (action, classCode) => {
    setSelectedAction(action);
    setSelectedClass(classCode);

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

  const confirmAction = async () => {
    try {
      if (selectedAction === 'archive') {
        // Perform archive action here (uncomment when API is ready)
        // await fetch(`/api/archiveClass?classCode=${selectedClass}`, { method: 'POST' });
      } else if (selectedAction === 'delete') {
        // Perform delete action here (uncomment when API is ready)
        // await fetch(`/api/deleteClass?classCode=${selectedClass}`, { method: 'DELETE' });
      }

      // After action, update class list
      setClasses(classes.filter((cls) => cls.classCode !== selectedClass));
    } catch (error) {
      console.error('Error performing action on class:', error);
    }

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
        <button className="create-class-btn">+ Create Class</button>
      </div>

      {/* Class Section */}
      {classes.map((cls) => (
        <div key={cls.classCode} className="class-section">
          <h2>{cls.subject} ({cls.classCode})</h2>

          {/* Class Cards */}
          <div className="class-cards">
            {cls.classCodes.map((code) => (
              <div key={code} className="class-card">
                <div className="class-info">
                  <p>CLASSCODE: {code}</p>
                  <p>Room: {cls.room}</p>
                  <p>Schedule: {cls.schedule}</p>
                  <button className="visit-class-btn">View Class</button>
                </div>
                <div className="class-actions">
                  <FaArchive className="archive-icon" onClick={() => handleActionClick('archive', code)} />
                  <FaTrash className="trash-icon" onClick={() => handleActionClick('delete', code)} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

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
