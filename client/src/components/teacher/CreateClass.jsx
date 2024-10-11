import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Modal} from "react-bootstrap";
import { TimePicker } from "antd";
import { useClassStore } from "../../stores/classStore";

const { RangePicker } = TimePicker;

const CreateClass = ({ goBack, onSuccess }) => {
  const [timeRange, setTimeRange] = useState(null);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showCancelConfirmation, setShowCancelConfirmation] = useState(false);
  const { addClass } = useClassStore();
  const [newClass, setNewClass] = useState({ 
    classCode: "",
    courseNumber: "",
    subject: "",
    academicYear: "",
    term: "", 
    room: "",
    days: [],
    startTime: "",
    endTime: "" 
  });

  const validateStringLength = (str, maxLength, value) => {
    if (str.length > maxLength) {
      return `Error: The ${value} exceeds the maximum length of ${maxLength} characters.`;
    }
    return null; // Return null if there's no error
  };
  
  // classCode: ""  - 5 digit
  //courseNumber: "", - no (done)
  // subject: "", -no (done)
  // academicYear: "", - yess (done)
  // term: "", - no (done)
  // room: "", - D516 yes
  // days: [], - must not be empty
  // startTime: "", must not be empty
 // endTime: "" must not be empty


  // Get the current year
  const currentYear = new Date().getFullYear();
  
  // Set the starting year to one year prior to the current year
  const startYear = currentYear - 1; 

  // Generate the academic years
  const years = Array.from({ length: 3 }, (_, index) => {
    const year = startYear + index;
    return `${year}-${year + 1}`;
  });

  const handleCreateClass = async (e) => {
    e.preventDefault();
    await addClass(newClass);

    setNewClass({ 
        classCode: "",
        courseNumber: "",
        subject: "",
        academicYear: "",
        term: "", 
        room: "",
        days: [],
        startTime: "",
        endTime: ""
    });
    setShowConfirmation(false);
    onSuccess();
  };

  const handleScheduleChange = (day) => {
    setNewClass((prevClass) => ({
      ...prevClass,
      days: prevClass.days.includes(day)
        ? prevClass.days.filter((d) => d !== day)
        : [...prevClass.days, day]
    }));
  };

  const handleTimeChange = (newTimeRange) => {
    if (newTimeRange && newTimeRange.length === 2) {
      setNewClass((prevClass) => ({
        ...prevClass,
        startTime: newTimeRange[0].format("hh:mm A"),
        endTime: newTimeRange[1].format("hh:mm A")
      }));
    }
    setTimeRange(newTimeRange);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfirmation(true);
  };

  const handleCancel = () => {
    setShowCancelConfirmation(true);
  };

  const handleConfirmCancel = () => {
    setNewClass("");
    setShowCancelConfirmation(false);
  };

  const handleCloseConfirmation = () => setShowConfirmation(false);
  const handleCloseCancelConfirmation = () => setShowCancelConfirmation(false);

  return (
    <Container
      className="attendance-container"
      style={{ height: "100vh", position: "relative" }}
    >
      {/* Navigation Buttons */}
      <Button
        variant="link"
        onClick={goBack}
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
              placeholder="Enter Class Code"
              value={newClass.classCode}
              onChange={(e) =>
                setNewClass({ ...newClass, classCode: e.target.value })
              }
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formcourseNumber">
          <Form.Label column sm="3" className="form-label">
            Course Number:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={newClass.courseNumber}
              onChange={(e) =>
                setNewClass({ ...newClass, courseNumber: e.target.value })
              }
              placeholder="Enter Course Number"
              className="form-control"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSubject">
          <Form.Label column sm="3" className="form-label">
            Subject:
          </Form.Label>
          <Col sm="9">
            <Form.Control
             value={newClass.subject}
             onChange={(e) =>
               setNewClass({ ...newClass, subject: e.target.value })
             }
              placeholder="Enter Subject"
              className="form-control"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAcademicYear">
          <Form.Label column sm="3" className="form-label">
            Academic Year:
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={newClass.academicYear}
              onChange={(e) =>
                setNewClass({ ...newClass, academicYear: e.target.value })
              }
              className="form-select"
              required
            >
              <option value="">Select Academic Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </Form.Select>
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTerm">
          <Form.Label column sm="3" className="form-label">
            Term:
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={newClass.term}
              onChange={(e) =>
                setNewClass({ ...newClass, term: e.target.value })
              }
              className="form-select"
              required
            >
              <option value="">Select Semester</option>
              <option value="First">First Semester</option>
              <option value="Second">Second Semester</option>
              <option value="Short">Short Term</option>
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
              value={newClass.room}
              onChange={(e) =>
                setNewClass({ ...newClass, room: e.target.value })
              }
              placeholder="Enter Room"
              className="form-control"
              required
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
          {/* Schedule Picker */}
          <div className="schedule-picker">
            {["M", "T", "W", "TH", "F", "S"].map((day) => (
              <Button
                key={day}
                variant={newClass.days.includes(day) ? "primary" : "outline-primary"}
                className={`m-1 ${newClass.days.includes(day) ? "selected" : "unselected"}`}
                onClick={() => handleScheduleChange(day)}
                required
              >
                {day}
              </Button>
            ))}
          </div>
          {/*Time Picker*/}
          <Form.Group as={Row} controlId="formTimeRange" className="mt-3">
            {" "}
            {/* Add margin-top for spacing */}
            <Form.Label column sm="3" className="form-label">
              Time:
            </Form.Label>
            <Col sm="9">
              <RangePicker
                value={timeRange}
                onChange={handleTimeChange}
                format="hh:mm A"
                minuteStep={30}
                showTime={{
                  format: "hh:mm A",
                  use12Hours: true,
                  minuteStep: 30,
                }}
                style={{ width: "100%" }}
                getPopupContainer={(trigger) => trigger.parentNode}
                required
              />
            </Col>
          </Form.Group>
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
            <strong>Class Code:</strong> {newClass.classCode}
          </p>
          <p>
            <strong>Course Number:</strong> {newClass.courseNumber}
          </p>
          <p>
            <strong>Subject:</strong> {newClass.subject}
          </p>
          <p>
            <strong>Academic Year:</strong> {newClass.academicYear}
          </p>
          <p>
            <strong>Term:</strong> {newClass.term} {newClass.term === "Short" ? "Term" : "Semester"}
          </p>
          <p>
            <strong>Room:</strong> {newClass.room}
          </p>
          <p>
            <strong>Schedule: </strong> 
            {newClass.days} {" "}
            {timeRange
              ? timeRange.map((time) => time.format("hh:mm A")).join(" - ")
              : "N/A"}
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
            onClick={handleCreateClass}
            className="custom-button"
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      {/* <Modal show={showSuccessModal} onHide={handleCloseSuccessModal} centered>
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
      </Modal> */}

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
