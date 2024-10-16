import React, { useState } from "react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { IoCaretBackCircleSharp } from "react-icons/io5";
import { TimePicker } from "antd";
import { useClassStore } from "../../stores/classStore";

const { RangePicker } = TimePicker;

const EditClass = ({ goBack, onSuccess }) => {
  const [timeRange, setTimeRange] = useState(null);
  const { addClass } = useClassStore();
  const [touchedFields, setTouchedFields] = useState({});
  const [errors, setErrors] = useState({});

  const [newClass, setNewClass] = useState({
    classCode: "",
    courseNumber: "",
    subject: "",
    academicYear: "",
    term: "",
    room: "",
    days: [],
    startTime: "",
    endTime: "",
  });

  // Get the current year and set the starting year to one year prior to the current year
  const currentYear = new Date().getFullYear();
  const startYear = currentYear - 1;

  // Generate the academic years
  const years = Array.from({ length: 3 }, (_, index) => {
    const year = startYear + index;
    return `${year}-${year + 1}`;
  });

  const validateField = (name, value) => {
    const validationErrors = {};
    const formattedName =
      typeof name === "string"
        ? name
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .replace(/^([a-z])/g, (match) => match.toUpperCase())
        : name;

    if (name === "classCode" && !/^\d{4}[A-Z]?$/.test(value)) {
      validationErrors.classCode =
        "Class code must be 4 digits, optionally followed by a capital letter (e.g., 9400 or 9400C).";
    }

    if (
      (name === "courseNumber" ||
        name === "subject" ||
        name === "academicYear" ||
        name === "term") &&
      !value.trim()
    ) {
      validationErrors[name] = `${formattedName} is required.`;
    }

    if (name === "room" && !/^[A-Z]\d{3}$/.test(value)) {
      validationErrors.room =
        "Room must be 1 capital letter followed by 3 digits (e.g., D515).";
    }

    if (name === "days" && newClass.days.length === 0) {
      validationErrors.days = "Days are required.";
    }

    if (name === "time" && (timeRange === null || timeRange.length < 2)) {
      validationErrors.time = "Time is required.";
    }

    return validationErrors;
  };

  const handleBlur = (name, value) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));

    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validate fields when submitting
    Object.keys(newClass).forEach((key) => {
      const fieldErrors = validateField(key, newClass[key]);
      Object.assign(validationErrors, fieldErrors);
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
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
        endTime: "",
      });
      onSuccess();
    }
  };

  const handleScheduleChange = (day) => {
    setTouchedFields((prev) => ({ ...prev, days: true }));
    setNewClass((prevClass) => {
      const updatedDays = prevClass.days.includes(day)
        ? prevClass.days.filter((d) => d !== day)
        : [...prevClass.days, day];

      if (updatedDays.length > 0) {
        setErrors((prevErrors) => {
          const { days, ...restErrors } = prevErrors;
          return restErrors;
        });
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          days: "Days are required.",
        }));
      }

      return {
        ...prevClass,
        days: updatedDays,
      };
    });
  };

  const handleTimeChange = (newTimeRange) => {
    setTimeRange(newTimeRange);

    if (newTimeRange && newTimeRange.length === 2) {
      setErrors((prevErrors) => {
        const { time, ...rest } = prevErrors;
        return rest;
      });
    }

    setNewClass((prevClass) => ({
      ...prevClass,
      startTime: newTimeRange ? newTimeRange[0]?.format("hh:mm A") : "",
      endTime: newTimeRange ? newTimeRange[1]?.format("hh:mm A") : "",
    }));
  };

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
          left: "25px",
          fontSize: "35px",
          textDecoration: "none",
          color: "#191970",
          padding: "1px 5px",
        }}
      >
        <IoCaretBackCircleSharp />
      </Button>

      {/* Edit Class Form */}
      <Form className="attendance-form">
        <h2 className="attendance-header">Edit Class</h2>

        <Form.Group as={Row} controlId="formClassCode">
          <Form.Label column sm="3" className="form-label fw-bold">
            Class Code:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              type="text"
              placeholder="Enter Class Code"
              value={newClass.classCode}
              onChange={(e) => {
                const value = e.target.value;
                setNewClass({ ...newClass, classCode: value });
                const fieldErrors = validateField("classCode", value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  classCode: fieldErrors.classCode,
                }));
              }}
              onBlur={(e) => handleBlur("classCode", e.target.value)}
              required
            />
            {touchedFields.classCode && errors.classCode && (
              <span
                style={{
                  color: "red",
                  paddingBottom: "30px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {errors.classCode}
              </span>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formCourseNumber">
          <Form.Label column sm="3" className="form-label fw-bold">
            Course Number:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              placeholder="Enter Course Number"
              className="form-control"
              value={newClass.courseNumber}
              onChange={(e) => {
                const value = e.target.value;
                setNewClass({ ...newClass, courseNumber: value });
                const fieldErrors = validateField("courseNumber", value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  courseNumber: fieldErrors.courseNumber,
                }));
              }}
              onBlur={(e) => handleBlur("courseNumber", e.target.value)}
              required
            />
            {touchedFields.courseNumber && errors.courseNumber && (
              <span
                style={{
                  color: "red",
                  paddingBottom: "30px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {errors.courseNumber}
              </span>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formSubject">
          <Form.Label column sm="3" className="form-label fw-bold">
            Subject:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={newClass.subject}
              onChange={(e) => {
                const value = e.target.value;
                setNewClass({ ...newClass, subject: value });
                const fieldErrors = validateField("subject", value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  subject: fieldErrors.subject,
                }));
              }}
              onBlur={(e) => handleBlur("subject", e.target.value)}
              placeholder="Enter Subject"
              className="form-control"
              required
            />
            {touchedFields.subject && errors.subject && (
              <span
                style={{
                  color: "red",
                  paddingBottom: "30px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {errors.subject}
              </span>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formAcademicYear">
          <Form.Label column sm="3" className="form-label fw-bold">
            Academic Year:
          </Form.Label>
          <Col sm="9">
            <Form.Select
              value={newClass.academicYear}
              onChange={(e) => {
                const value = e.target.value;
                setNewClass({ ...newClass, academicYear: value });
                const fieldErrors = validateField("academicYear", value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  academicYear: fieldErrors.academicYear,
                }));
              }}
              onBlur={(e) => handleBlur("academicYear", e.target.value)}
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
            {touchedFields.academicYear && errors.academicYear && (
              <span
                style={{
                  color: "red",
                  paddingBottom: "30px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {errors.academicYear}
              </span>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTerm">
          <Form.Label column sm="3" className="form-label fw-bold">
            Term:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={newClass.term}
              onChange={(e) => {
                const value = e.target.value;
                setNewClass({ ...newClass, term: value });
                const fieldErrors = validateField("term", value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  term: fieldErrors.term,
                }));
              }}
              onBlur={(e) => handleBlur("term", e.target.value)}
              placeholder="Enter Term"
              className="form-control"
              required
            />
            {touchedFields.term && errors.term && (
              <span
                style={{
                  color: "red",
                  paddingBottom: "30px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {errors.term}
              </span>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formRoom">
          <Form.Label column sm="3" className="form-label fw-bold">
            Room:
          </Form.Label>
          <Col sm="9">
            <Form.Control
              value={newClass.room}
              onChange={(e) => {
                const value = e.target.value;
                setNewClass({ ...newClass, room: value });
                const fieldErrors = validateField("room", value);
                setErrors((prevErrors) => ({
                  ...prevErrors,
                  room: fieldErrors.room,
                }));
              }}
              onBlur={(e) => handleBlur("room", e.target.value)}
              placeholder="Enter Room"
              className="form-control"
              required
            />
            {touchedFields.room && errors.room && (
              <span
                style={{
                  color: "red",
                  paddingBottom: "30px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {errors.room}
              </span>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formDays">
          <Form.Label column sm="3" className="form-label fw-bold">
            Days:
          </Form.Label>
          <Col sm="9">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <Form.Check
                  key={day}
                  type="checkbox"
                  label={day}
                  checked={newClass.days.includes(day)}
                  onChange={() => handleScheduleChange(day)}
                />
              )
            )}
            {touchedFields.days && errors.days && (
              <span
                style={{
                  color: "red",
                  paddingBottom: "30px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {errors.days}
              </span>
            )}
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formTime">
          <Form.Label column sm="3" className="form-label fw-bold">
            Time:
          </Form.Label>
          <Col sm="9">
            <RangePicker
              format="hh:mm A"
              onChange={handleTimeChange}
              style={{ width: "100%" }}
            />
            {touchedFields.time && errors.time && (
              <span
                style={{
                  color: "red",
                  paddingBottom: "30px",
                  display: "block",
                  fontSize: "14px",
                }}
              >
                {errors.time}
              </span>
            )}
          </Col>
        </Form.Group>

        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={goBack}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSaveChanges}
            type="submit"
          >
            Save Changes
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default EditClass;
