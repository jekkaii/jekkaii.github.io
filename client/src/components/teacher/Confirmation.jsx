/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";
import "../css/style.css";
import { Modal, Button } from "antd";

const Confirmation = ({ isOpen, onClose, onConfirm, message }) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <p 
        style = {{ 
          margin: "30px",
          color: "#2a1f7e",
          fontSize: "17px",
          textAlign: "center",
        }}
      >
        {message}
      </p>

      <div className="text-center mb-4">
        <Button
          style = {{ 
            marginRight: "25px",
            padding: "18px 35px",
            fontWeight: "bold",
            fontSize: "17px",
          }}
          color="danger" 
          variant="solid"
          onClick={onConfirm}
        >
          Yes
        </Button>
        <Button 
          style = {{ 
            padding: "18px 22px",
            fontWeight: "bold",
            fontSize: "17px",
            color: "#2a1f7e",
          }}
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default Confirmation;