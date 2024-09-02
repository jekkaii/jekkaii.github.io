import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";

const CreateClass = () => {
  const [classCode, setClassCode] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);

  const handleClassCodeChange = (e) => setClassCode(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Class Code:", classCode);
    console.log("Subject:", subject);
    if (file) {
      console.log("File:", file.name);
    }
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setClassCode("");
    setSubject("");
    setFile(null);
    setShowCancelConfirmation(false);
  };

  const handleBackClick = () => {
    console.log("Back clicked");
  };

  const handleMenuClick = () => {
    console.log("Menu clicked");
  };

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleCloseCancelConfirmation = () => setShowCancelConfirmation(false);
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh", position: "relative" }}
    >
      <Button
        variant="link"
        onClick={handleBackClick}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          fontSize: "24px",
          textDecoration: "none",
          color: "#000",
          backgroundColor: "#f0f0f0",
          padding: "8px",
          borderRadius: "50%",
        }}
      >
        ←
      </Button>

      <Button
        variant="link"
        onClick={handleMenuClick}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          fontSize: "24px",
          textDecoration: "none",
          color: "#000",
          backgroundColor: "#f0f0f0",
          padding: "8px",
          borderRadius: "50%",
        }}
      >
        ☰
      </Button>

      <Form onSubmit={handleSubmit} className="text-center">
        <h2 style={{ marginBottom: "20px" }}>Create Class</h2>
        <Form.Group as={Row} className="mb-3" controlId="formClassCode">
          <Form.Label column sm="3">
            Class Code:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              value={classCode}
              onChange={handleClassCodeChange}
              placeholder="Enter Class Code"
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formSubject">
          <Form.Label column sm="3">
            Subject:
          </Form.Label>
          <Col sm="9">
            <Form.Select value={subject} onChange={handleSubjectChange}>
              <option value="">Select Subject</option>
              <option value="ICLEC">INTRODUCTION TO COMPUTING (LEC)</option>
              <option value="ICLAB">INTRODUCTION TO COMPUTING (LAB)</option>
              <option value="COMPROG 1 LEC">
                COMPUTER PROGRAMMING 1 (LEC)
              </option>
              <option value="COMPROG 2 LEC">
                COMPUTER PROGRAMMING 1 (LAB)
              </option>
            </Form.Select>
          </Col>
        </Form.Group>
        <div style={{ marginBottom: "30px" }}>
          <Button
            variant="success"
            className="me-2"
            onClick={() => document.getElementById("fileInput").click()}
          >
            Upload Excel
          </Button>
          <input
            type="file"
            id="fileInput"
            accept=".xls,.xlsx"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div style={{ marginBottom: "20px" }}>
          <Button variant="primary" type="submit" className="me-4">
            Create Class
          </Button>
          <Button variant="danger" onClick={handleCancel}>
            Cancel
          </Button>
        </div>
      </Form>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>Class Created</Modal.Title>
        </Modal.Header>
        <Modal.Body>Your class has been successfully created!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseConfirmation}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showCancelConfirmation}
        onHide={handleCloseCancelConfirmation}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Cancel Class Creation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to cancel?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCancelConfirmation}>
            NO
          </Button>
          <Button variant="danger" onClick={handleConfirmCancel}>
            YES
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default CreateClass;
