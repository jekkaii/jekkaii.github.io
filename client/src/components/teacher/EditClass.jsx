import React, { useState, useEffect } from "react";
import { Button, Modal } from "antd";
import { Form, Row, Col } from "react-bootstrap";
import { TimePicker } from "antd";
import { useClassStore } from "../../stores/classStore";
import moment from "moment";
import "../css/style.css";

const { RangePicker } = TimePicker;

const EditClass = ({ onSuccess, open, close, selectedClass }) => {
  const [timeRange, setTimeRange] = useState([]);
  const { updateClass, readClasses, classes } = useClassStore();
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

  useEffect(() => {
    readClasses();
  }, [readClasses]);

  useEffect(() => {
    if (selectedClass) {
      setTimeRange([
        selectedClass.startTime ? moment(selectedClass.startTime, 'hh:mm A') : null,
        selectedClass.endTime ? moment(selectedClass.endTime, 'hh:mm A') : null,
      ]);
    }
  }, [selectedClass]);

  useEffect(() => {
    if (selectedClass) {
      setNewClass({
        classCode: selectedClass.classCode || "",
        courseNumber: selectedClass.courseNumber || "",
        subject: selectedClass.subject || "",
        academicYear: selectedClass.academicYear || "",
        term: selectedClass.term || "",
        room: selectedClass.room || "",
        days: selectedClass.days || "",
        startTime: selectedClass.startTime || "",
        endTime: selectedClass.endTime || "",
      });
    }
  }, [selectedClass]);  // Runs whenever selectedClass changes

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

    if (
      (name === "courseNumber" ||
        name === "subject" ||
        name === "academicYear" ||
        name === "term") &&
      !value.trim()
    ) {
      validationErrors[name] = `${formattedName} is required.`;
    }

    // if (name === "room" && !/^[a-zA-Z]\d{3}$/.test(value)) {
    //   validationErrors.room =
    //     "Room must be 1 letter followed by 3 digits (e.g., D515).";
    // }

    if (name === "days" && newClass.days.length === 0) {
      validationErrors.days = "Days are required.";
    }

    return validationErrors;
  };

  const handleBlur = (name, value) => {
    setTouchedFields((prevTouched) => ({ ...prevTouched, [name]: true }));

    const fieldErrors = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, ...fieldErrors }));
  };

  const handleEditClass = async (e) => {
    e.preventDefault();

    const validationErrors = {};

    // Validate fields when submitting
    Object.keys(selectedClass).forEach((key) => {
      const fieldErrors = validateField(key, selectedClass[key]);
      Object.assign(validationErrors, fieldErrors);
    });

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const updatedClass = {
        classCode: newClass.classCode.toUpperCase(),
        courseNumber: newClass.courseNumber.toUpperCase(),
        subject: newClass.subject
          .toLowerCase()
          .replace(/\b\w/g, char => char.toUpperCase())
          .replace(/\bIt\b/g, 'IT'),
        room: newClass.room.toUpperCase(),
        days: newClass.days,
        startTime: timeRange[0] ? timeRange[0].format('hh:mm A') : '',
        endTime: timeRange[1] ? timeRange[1].format('hh:mm A') : '',
        academicYear: newClass.academicYear,
        term: newClass.term,
      };

      console.log("Updated class object:", updatedClass); 
      await updateClass(selectedClass._id, updatedClass);
      close();
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
    if (newTimeRange && newTimeRange.length === 2) {
      let [startTime, endTime] = newTimeRange;
  
      // Check if start time and end time are the same
      if (startTime.isSame(endTime)) {
        // Check if the start time is 8:30 PM\
        console.log(startTime);
        if (startTime.format("hh:mm A") === "08:30 PM") {
          startTime = startTime.subtract(1, 'hour');  // Reassign the modified startTime
          console.log(true);
        } else {
          endTime = endTime.add(1, 'hour');  // Reassign the modified endTime
        }
        newTimeRange = [startTime, endTime];  // Update timeRange
      }
  
      setTimeRange(newTimeRange);
  
      setNewClass((prevClass) => ({
        ...prevClass,
        startTime: startTime.format("hh:mm A"),
        endTime: endTime.format("hh:mm A"),
      }));
    }
  };

  return (
    <>
      <Modal
        open={open}
        onCancel={close}
        footer={null}
        width={660}
        className="create-class-modal"
      >
        <h2 className="attendance-header">Edit Class</h2>
        
        {/* Create Class Form */}
          {/* Create Class Form */}
          <Form className="attendance-form">
            <Form.Group as={Row} controlId="formClassCode">
              <Form.Label column sm="3" className="form-label fw-bold">
                Class Code:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  value={newClass.classCode}
                  required
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formcourseNumber">
              <Form.Label column sm="3" className="form-label fw-bold">
                Course Number:
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  placeholder="Enter Course Number"
                  className={`form-control ${touchedFields.courseNumber && errors.courseNumber ? 'no-margin' : ''}`}
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
                      paddingBottom: "20px",
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
                  className={`form-control ${touchedFields.subject && errors.subject ? 'no-margin' : ''}`}
                  required
                />
                {touchedFields.subject && errors.subject && (
                  <span
                    style={{
                      color: "red",
                      paddingBottom: "20px",
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
                  className={`form-select ${touchedFields.academicYear && errors.academicYear ? 'no-margin' : ''}`}
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
                      paddingBottom: "20px",
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
                <Form.Select
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
                  className={`form-select ${touchedFields.term && errors.term ? 'no-margin' : ''}`}
                  required
                >
                  <option value="">Select Semester</option>
                  <option value="First">First Semester</option>
                  <option value="Second">Second Semester</option>
                  <option value="Short">Short Term</option>
                </Form.Select>
                {touchedFields.term && errors.term && (
                  <span
                    style={{
                      color: "red",
                      paddingBottom: "20px",
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
                  type="text"
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
                  className={`form-control ${touchedFields.room && errors.room ? 'no-margin' : ''}`}
                  required
                />
                {touchedFields.room && errors.room && (
                  <span
                    style={{
                      color: "red",
                      paddingBottom: "20px",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    {errors.room}
                  </span>
                )}
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formSchedule">
              <Form.Label column sm="3" className="form-label fw-bold">
                Days:
              </Form.Label>
              <Col sm="9" className="d-flex align-items-center">
                <div  className={`schedule-picker d-flex w-100 ${touchedFields.days && errors.days ? 'no-margin' : ''}`}>
                  {["M", "T", "W", "TH", "F", "S"].map((day) => (
                    <Button
                      key={day}
                      variant={
                        newClass.days.includes(day) ? "primary" : "outline-primary"
                      }
                      className={`m-0 my-1 py-1 ${
                        newClass.days.includes(day) ? "selected" : "unselected"
                      } w-100`}
                      onClick={() => handleScheduleChange(day)}
                    >
                      {day}
                    </Button>
                  ))}
                </div>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Col sm="3"></Col>

              <Col sm="9">
                {touchedFields.days && newClass.days.length === 0 && (
                  <span
                    style={{
                      color: "red",
                      paddingBottom: "20px",
                      display: "block",
                      fontSize: "14px",
                    }}
                  >
                    {errors.days}
                  </span>
                )}
              </Col>
            </Form.Group>

            {/* Time Picker */}
            <Form.Group as={Row} controlId="formTimeRange" className="mt-3">
              <Form.Label column sm="3" className="form-label fw-bold">
                Time:
              </Form.Label>
              <Col>
                <RangePicker
                  value={timeRange}
                  onChange={handleTimeChange}
                  onBlur={handleBlur}
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
                  disabledTime={(current) => {
                    if (!current) return {};

                    const startHour =
                      timeRange && timeRange[0] ? timeRange[0].hour() : null;

                    return {
                      disabledHours: () => {
                        const disabled = [
                          ...Array(7).keys(),
                          ...Array.from({ length: 3 }, (_, i) => i + 21),
                        ];
                        // If start time exists, disable hours before the selected start time for end picker
                        if (startHour !== null) {
                          return disabled.concat(
                            Array.from({ length: startHour }, (_, i) => i)
                          );
                        }
                        return disabled;
                      },
                      disabledMinutes: (selectedHour) => {
                        const startMinute =
                          timeRange && timeRange[0] ? timeRange[0].minute() : null;
                        if (selectedHour === 7) {
                          return [0, 15]; // Disable minutes before 7:30 AM
                        }
                        if (selectedHour === 20) {
                          return [45, 59]; // Disable minutes after 8:30 PM
                        }
                        // If selected hour matches start hour, disable minutes earlier than the start time
                        if (
                          startHour !== null &&
                          selectedHour === startHour &&
                          startMinute !== null
                        ) {
                          return Array.from(
                            { length: startMinute + 1 },
                            (_, i) => i
                          ); // Disable minutes before the start minute
                        }
                        return [];
                      },
                    };
                  }}
                />
              </Col>
            </Form.Group>

            <div className="button-container">
              <Button
                variant="primary"
                type="submit"
                className="custom-button create-button"
                onClick={handleEditClass}
              >
                Save Changes
              </Button>
            </div>
          </Form>
      </Modal>
    </>
  );
};

export default EditClass;
