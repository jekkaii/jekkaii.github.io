import React from 'react';
import '../css/style.css'; 
import { Modal, Button } from 'react-bootstrap';

const Confirmation = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal show={isOpen} onHide={onClose} centered>
      <Modal.Header closeButton></Modal.Header>
      
      <Modal.Body>
        <p className='text-center' id="confirmationMessage">{message}</p>
      </Modal.Body>
      <div className="text-center mb-4">
        <Button className="me-4" id="yes-btn" variant="primary" onClick={onConfirm}>
            Yes
        </Button>
        <Button id="no-btn" variant="secondary" onClick={onClose}>
          No
        </Button>
      </div>
    </Modal>
  );
};

export default Confirmation;
