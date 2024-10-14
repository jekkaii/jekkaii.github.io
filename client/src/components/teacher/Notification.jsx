import React from 'react';
import '../css/style.css'; // Create your CSS file for styling

const Notification = ({ message, type, onClose }) => {
  return (
    <div className={`notification ${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default Notification;
