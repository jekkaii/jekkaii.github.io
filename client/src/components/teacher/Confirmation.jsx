import React from 'react';
import '../css/style.css'; 

const Confirmation = ({ isOpen, onClose, onConfirm, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-contents">
        <button className="modal-close" onClick={onClose}>X</button>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="confirm-btn" onClick={onConfirm}>Yes</button>
          <button className="cancel-btn" onClick={onClose}>No</button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
