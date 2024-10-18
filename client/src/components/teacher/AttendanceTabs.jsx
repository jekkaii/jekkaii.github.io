/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { Tabs, Tab, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import AttendanceSummary from "./AttendanceSummary";
import DailyAttendance from "./DailyAttendance";
import "../css/style.css";
import ManageStudents from "./ManageStudents";
import { FaCamera } from "react-icons/fa6";
import UploadClassPicture from "./UploadClassPicture";
import { useStudentStore } from "../../stores/studentStore";
import { Skeleton, Flex } from "antd";
import { useParams } from "react-router-dom";

const AttendanceTabs = () => {
  // Use parameter
  const params = useParams();

  const [key, setKey] = useState("daily");
  const [searchTerm, setSearchTerm] = useState("");

  const subjectAndCode = "IT 222 - 9451";
  const sched = "TThS (7:30 - 9:00 AM)";
  const date = "April 22, 2024";

  // Student Store
  const { getStudents, updateStudentStatus, students, isLoading, error } =
    useStudentStore();

  useEffect(() => {
    if (params.classcode) {
      getStudents(params.classcode);
    }
  }, [params.classcode, getStudents]);

  const [attendanceData, setAttendanceData] = useState(
    students.map((student) => ({
      id: student._id,
      idNumber: student.idNumber,
      name: student.name,
      status: student.status,
      attendance: [],
    }))
  );

  useEffect(() => {
    setAttendanceData(
      students.map((student) => ({
        id: student._id,
        idNumber: student.idNumber,
        name: student.name,
        status: student.status,
        attendance: [],
      }))
    );
  }, [students]);

  const sortedData = [...attendanceData].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  /* For the Date Picker */
  const [dateValue, setDateValue] = useState(dayjs());
  const [formattedDate, setFormattedDate] = useState(
    dateValue.format("MMMM D, YYYY")
  );

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
    const dateString = newValue.format("MMMM D, YYYY");
    setFormattedDate(dateString);
  };

  const handleManualAttendance = (id) => {
    setAttendanceData((prevData) =>
      prevData.map((entry) =>
        entry.idNumber === id
          ? {
              ...entry,
              status: entry.status === "Absent" ? "Present" : "Absent",
            }
          : entry
      )
    );
  };

  // // Filter the info based on the searchTerm
  // const filteredInfo = sortedData.filter((entry) => {
  //   const lowerCaseSearchTerm = searchTerm.toLowerCase();
  //   return (
  //     entry.name.toLowerCase().includes(lowerCaseSearchTerm) ||
  //     entry.idNumber.includes(lowerCaseSearchTerm)
  //   );
  // });

  return (
    <Flex vertical style={{ width: "100%" }}>
      <Flex></Flex>
      {/* Tabs */}
      <Flex
        vertical
        style={{
          // margin: "30px 30px 0",
          padding: 24,
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 2px 10px 0px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          {/* Daily Attendance Tab */}
          <Tab eventKey="daily" title="Daily Attendance">
            <Row className="align-items-end mb-0 mt-5">
              <Col xs={8} className="p-0"></Col>
              <Col xs={4} className="d-flex justify-content-end p-0">
                <InputGroup className="search-bar">
                  <Form.Control
                    placeholder="Search by ID Number or Name"
                    className="custom-search-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </InputGroup>
                <Button className="me-2" id="camera">
                  <FaCamera className="fs-4" />
                </Button>
                <UploadClassPicture
                  date={formattedDate}
                  subjectAndCode={subjectAndCode}
                  schedule={sched}
                ></UploadClassPicture>
              </Col>
            </Row>
            {isLoading ? (
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              <DailyAttendance
                handleManualAttendance={handleManualAttendance}
                sortedData={sortedData}
              />
            )}
          </Tab>
          {/* Attendance Summary Tab  */}
          <Tab eventKey="summary" title="Attendance Summary">
            <div id="tabsTitle">
              <p className="mb-2 fw-bold fs-3 text-center">{subjectAndCode}</p>
              <p className="mb-0 text-center">
                <b>Schedule: </b>
                {sched}
              </p>
              <p className="mb-5 text-center">
                <b>Date: </b>
                {date}
              </p>
              <Row className="mb-0 justify-content-end">
                <Col xs={3}>
                  <InputGroup>
                    <Form.Control
                      placeholder="Search by ID Number or Name"
                      className="custom-search-input"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>
            </div>
            {isLoading ? (
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              <AttendanceSummary info={sortedData}></AttendanceSummary>
            )}
          </Tab>
          {/* Manage Students Tab */}
          <Tab eventKey="manage" title="Manage Students">
            <div id="tabsTitle">
              <p className="mb-2 fw-bold fs-3 text-center">{subjectAndCode}</p>
              <p className="mb-0 text-center">
                <b>Schedule: </b>
                {sched}
              </p>
              <p className="mb-0 text-center">
                <b>Date: </b>
                {date}
              </p>
            </div>
            {isLoading ? (
              <>
                <Skeleton active />
                <Skeleton active />
                <Skeleton active />
              </>
            ) : (
              <ManageStudents
                sortedData={sortedData}
                attendanceData={attendanceData}
              ></ManageStudents>
            )}
          </Tab>
        </Tabs>
      </Flex>
    </Flex>
  );
};

export default AttendanceTabs;
