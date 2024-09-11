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
  const [time, setTime] = useState("");
  const [academicYear, setAcademicYear] = useState("");
  const [term, setTerm] = useState("");
  const [room, setRoom] = useState("");
  const [schedule, setSchedule] = useState([]);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const handleClassCodeChange = (e) => setClassCode(e.target.value);
  const handleSubjectChange = (e) => setSubject(e.target.value);
  const handleTimeChange = (e) => setTime(e.target.value);
  const handleAcademicYearChange = (e) => setAcademicYear(e.target.value);
  const handleTermChange = (e) => setTerm(e.target.value);
  const handleRoomChange = (e) => setRoom(e.target.value);

  const handleScheduleChange = (day) => {
    if (schedule.includes(day)) {
      setSchedule(schedule.filter((d) => d !== day));
    } else {
      setSchedule([...schedule, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setClassCode("");
    setSubject("");
    setTime("");
    setAcademicYear("");
    setTerm("");
    setRoom("");
    setSchedule([]);
    setShowCancelConfirmation(false);
  };

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleCloseCancelConfirmation = () => setShowCancelConfirmation(false);

  const handleConfirmDetails = () => {
    setShowConfirmation(false); // Close confirmation modal
    setShowSuccessModal(true); // Show success modal
  };

  const handleCloseSuccessModal = () => setShowSuccessModal(false);

  return (
    <Container
      className="attendance-container"
      style={{ height: "100vh", position: "relative" }}
    >
      {/* Navigation Buttons */}
      <Button
        variant="link"
        onClick={() => console.log("Back clicked")}
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
        onClick={() => console.log("Menu clicked")}
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

      {/* Create Class Form */}
      <Form onSubmit={handleSubmit} className="attendance-form">
        <h2 className="attendance-header">Create Class</h2>

        <Form.Group as={Row} className="mb-3" controlId="formClassCode">
          <Form.Label column sm="3" className="form-label">
            Class Code:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              value={classCode}
              onChange={handleClassCodeChange}
              placeholder="Enter Class Code"
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSubject">
          <Form.Label column sm="3" className="form-label">
            Subject:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={subject}
              onChange={handleSubjectChange}
              placeholder="Enter Subject"
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTime">
          <Form.Label column sm="3" className="form-label">
            Time:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              value={time}
              onChange={handleTimeChange}
              placeholder="Enter Time"
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAcademicYear">
          <Form.Label column sm="3" className="form-label">
            Academic Year:
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={academicYear}
              onChange={handleAcademicYearChange}
              className="form-select"
            >
              <option value="">Select Academic Year</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2025-2026">2025-2026</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTerm">
          <Form.Label column sm="3" className="form-label">
            Term:
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={term}
              onChange={handleTermChange}
              className="form-select"
            >
              <option value="">Select Term</option>
              <option value="Prelims">Prelims</option>
              <option value="Midterms">Midterms</option>
              <option value="Finals">Finals</option>
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRoom">
          <Form.Label column sm="3" className="form-label">
            Room:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              value={room}
              onChange={handleRoomChange}
              placeholder="Enter Room"
              className="form-control"
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSchedule">
          <Form.Label column sm="3" className="form-label">
            Schedule:
          </Form.Label>
          <Col sm="9">
            <Button
              variant="secondary"
              onClick={() => setShowScheduleModal(true)}
              className="custom-button schedule-button"
            >
              Select Schedule
            </Button>
          </Col>
        </Form.Group>

        <div className="button-container">
          <Button
            variant="primary"
            type="submit"
            className="custom-button create-button"
          >
            Create Class
          </Button>
          <Button
            variant="danger"
            onClick={handleCancel}
            className="custom-button cancel-button"
          >
            Cancel
          </Button>
        </div>
      </Form>

      {/* Schedule Modal */}
      <Modal
        show={showScheduleModal}
        onHide={() => setShowScheduleModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Select Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="schedule-picker">
            {["M", "T", "W", "TH", "F", "S"].map((day) => (
              <Button
                key={day}
                variant={schedule.includes(day) ? "primary" : "outline-primary"}
                className={`m-1 ${
                  schedule.includes(day) ? "selected" : "unselected"
                }`}
                onClick={() => handleScheduleChange(day)}
              >
                {day}
              </Button>
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            variant="danger"
            onClick={() => setShowScheduleModal(false)}
            className="custom-button"
          >
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => setShowScheduleModal(false)}
            className="custom-button"
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={handleCloseConfirmation} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Class Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <strong>Class Code:</strong> {classCode}
          </p>
          <p>
            <strong>Subject:</strong> {subject}
          </p>
          <p>
            <strong>Time:</strong> {time}
          </p>
          <p>
            <strong>Academic Year:</strong> {academicYear}
          </p>
          <p>
            <strong>Term:</strong> {term}
          </p>
          <p>
            <strong>Room:</strong> {room}
          </p>
          <p>
            <strong>Schedule:</strong> {schedule.join(", ")}
          </p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            variant="secondary"
            onClick={handleCloseConfirmation}
            className="custom-button"
          >
            Edit
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirmDetails} // Show success modal on confirmation
            className="custom-button"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your class has been successfully created!</p>
        </Modal.Body>
        <Modal.Footer className="modal-footer">
          <Button
            variant="primary"
            onClick={handleCloseSuccessModal}
            className="custom-button"
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Cancel Confirmation Modal */}
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
