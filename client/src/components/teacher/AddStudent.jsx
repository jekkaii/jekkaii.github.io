/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
import { RiUserAddLine } from "react-icons/ri";
import { useStudentStore } from "../../stores/studentStore";
import "../css/style.css";

const AddStudent = ({ onSuccess }) => {
  const [show, setShow] = useState(false);
  const [newStudent, setNewStudent] = useState({ idNumber: "", name: "" });
  const { addStudent } = useStudentStore();
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});

  const handleClose = () => {
    setNewStudent({ idNumber: "", name: "" });
    setErrors({});
    setTouchedFields({});
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const validateField = (name, value) => {
    const validationErrors = {};

    if (name === "idNumber" && !(/^\d{7}$/.test(value))) {
      validationErrors.idNumber = "ID number must be exactly 7 digits.";
    }
  
    if (name === "name" && !value.trim()) {
      validationErrors.name = "Name is required.";
    }
  
    return validationErrors;
  };

  const handleBlur = (name, value) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));
  
    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleAddToClass = async (e) => {
    e.preventDefault();
  
    const validationErrors = {}
  
    Object.keys(newStudent).forEach((key) => {
      const fieldErrors = validateField(key, newStudent[key]);
      Object.assign(validationErrors, fieldErrors);
    });

    setErrors(validationErrors);
  
    if (Object.keys(validationErrors).length === 0) {
      await addStudent(newStudent);

      setNewStudent({ idNumber: "", name: "" });
      handleClose();
      onSuccess();
    }
  };

  return (
    <>
      <Button
        variant="success"
        className="me-2 add-student-btn"
        id="add-student-btn"
        onClick={handleShow}
      >
        <RiUserAddLine className="fs-4" />
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>

        <Modal.Title
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="fs-2 m-3 fw-bold"
          id="addTitle"
        >
          Add Student
        </Modal.Title>

        <Modal.Body>
          <Form id="formBody">
            <Form.Group as={Row} className="mb-2">
              <Form.Label className="fw-bold" column sm={4}>
                ID Number:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  placeholder="Enter ID Number"
                  id="formInput"
                  value={newStudent.idNumber}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewStudent({ ...newStudent, idNumber: value });
                    const fieldErrors = validateField("idNumber", value); 
                    setErrors((prevErrors) => ({ ...prevErrors, idNumber: fieldErrors.idNumber }));
                  }}
                  onBlur={(e) => handleBlur("idNumber", e.target.value)}
                  required
                />
                {touchedFields.idNumber && errors.idNumber && (
                  <span style={{ color: "red", paddingBottom: "30px", display: "block", fontSize: "14px" }}>
                    {errors.idNumber}
                  </span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label className="fw-bold" column sm={4}>
                Name:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  placeholder="Enter Name"
                  id="formInput"
                  value={newStudent.name}
                  onChange={(e) => {
                    const value = e.target.value;
                    setNewStudent({ ...newStudent, name: value });
                    const fieldErrors = validateField("name", value); 
                    setErrors((prevErrors) => ({ ...prevErrors, name: fieldErrors.name }));
                  }}
                  onBlur={(e) => handleBlur("name", e.target.value)}
                  required
                />
                {touchedFields.name && errors.name && (
                <span style={{ color: "red", paddingBottom: "30px", display: "block", fontSize: "14px" }}>
                  {errors.name}
                </span>
              )}
              </Col>
            </Form.Group>
          </Form>

          <div id="buttondiv" className="text-center">
            <Button
              className="text-white fw-bold mb-4"
              id="addButton"
              onClick={handleAddToClass}
            >
              Add to Class
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddStudent;
