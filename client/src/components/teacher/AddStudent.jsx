/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Button, Modal, Alert } from "antd";
import { useStudentStore } from "../../stores/studentStore";
import "../css/style.css";
import {  PlusOutlined } from "@ant-design/icons";

const AddStudent = ({ onSuccess, classCode }) => {
  const [show, setShow] = useState(false);
  const [newStudent, setNewStudent] = useState({ idNumber: "", name: "" });
  const { addStudent, error } = useStudentStore();
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
    console.log(`ClassCode: ${classCode}`);
  
    if (Object.keys(validationErrors).length === 0) {
      await addStudent(classCode,newStudent);

      setNewStudent({ idNumber: "", name: "" });
      handleClose();
      onSuccess();
    }
  };

  return (
    <>
      <Button type="primary" size="medium" onClick={handleShow}>
          <PlusOutlined className="fs-7" />
            Add Student
        </Button>

      <Modal
        open={show}
        onCancel={handleClose}
        footer={null}
        width={550}
      >
        <h2 
          className="attendance-header" 
          style={{ marginBottom: "30px" }}
        >
          Add Student
        </h2>

        {/* Error Message from the Server */}
        {error && (
          <Alert className="mb-3" message={error} type="error" showIcon />
        )}

        <Form id="formBody">
          <Form.Group as={Row} className="mb-2">
            <Form.Label className="fw-bold" column sm={3}>
              ID Number:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                placeholder="Enter ID Number"
                value={newStudent.idNumber}
                className={`form-control ${touchedFields.idNumber && errors.idNumber ? 'no-margin' : ''}`}
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
                <span
                  style={{
                  color: "red",
                  paddingBottom: "20px",
                  display: "block",
                  fontSize: "14px",
                  }}
                >
                  {errors.idNumber}
                </span>
              )}
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-2">
            <Form.Label className="fw-bold" column sm={3}>
              Name:
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                placeholder="Enter Name"
                className={`form-control ${touchedFields.name && errors.name ? 'no-margin' : ''}`}
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
                <span
                style={{
                color: "red",
                paddingBottom: "20px",
                display: "block",
                fontSize: "14px",
                }}
                >
                  {errors.name}
                </span>
              )}
            </Col>
          </Form.Group>
        </Form>

        <div id="button-container" className="text-center">
          <Button
            variant="primary"
            type="submit"
            className="add-button"
            onClick={handleAddToClass}
          >
            Add to Class
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddStudent;
