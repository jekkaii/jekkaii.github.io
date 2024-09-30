import React from 'react';
import { useState } from 'react';
import { Tabs, Tab, Row, Col, InputGroup, Form, Button } from "react-bootstrap";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import AttendanceSummaryTable from "./AttendanceSummary";
import DailyAttendance from './DailyAttendance';
import "../css/style.css"; 
import ManageStudents from './ManageStudents';
import { FaCamera } from "react-icons/fa6";
import UploadClassPicture from './UploadClassPicture';

const AttendanceTabs = () => {
  const [key, setKey] = useState("daily");
  const [searchTerm, setSearchTerm] = useState("");

  const subjectAndCode = "IT 222 - 9451";
  const sched = "TThS (7:30 - 9:00 AM)";
  const date = "April 22, 2024";
 
  const [attendanceData, setAttendanceData] = useState([
    // Dummy Data
    {
      id: 1,
      idNumber: "2221234",
      name: "Dela Cruz, Juan",
      status: "Present",
      absencesDates: [
        "August 13, 2024",
        "August 22, 2024",
        "September 3, 2024",
        "September 24, 2024",
      ],
    },
    {
      id: 2,
      idNumber: "2220848",
      name: "Escobar, Juan",
      status: "Absent",
      absencesDates: ["August 10, 2024"],
    },
    {
      id: 3,
      idNumber: "2220821",
      name: "Flores, Juan",
      status: "Present",
      absencesDates: [],
    },
    {
      id: 4,
      idNumber: "2222256",
      name: "Gomez, Juan",
      status: "Present",
      absencesDates: [],
    },
    {
      id: 5,
      idNumber: "2227790",
      name: "Hernandez, Juan",
      status: "Absent",
      absencesDates: [],
    },
    {
      id: 6,
      idNumber: "2229090",
      name: "Gomez, Juan",
      status: "Absent",
      absencesDates: ["August 10, 2024"],
    },
  ]);
  
  const sortedData = [...attendanceData].sort((a, b) => a.name.localeCompare(b.name));
  
  /* For the Date Picker */
  const [dateValue, setDateValue] = useState(dayjs());
  const [formattedDate, setFormattedDate] = useState(dateValue.format('MMMM D, YYYY'));

  const handleDateChange = (newValue) => {
    setDateValue(newValue);
    const dateString = newValue.format('MMMM D, YYYY');
    setFormattedDate(dateString);
  };

  const handleManualAttendance = (id) => {
    setAttendanceData((prevData) =>
      prevData.map((entry) =>
        entry.id === id
          ? {
              ...entry,
              status: entry.status === "Absent" ? "Present" : "Absent",
            }
          : entry
      )
    );
  };

  // Filter the info based on the searchTerm
  const filteredInfo = sortedData.filter((entry) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      entry.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      entry.idNumber.includes(lowerCaseSearchTerm)
    );
  });

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      {/* Daily Attendance Tab */}
      <Tab eventKey="daily" title="Daily Attendance">
        <div id="tabsTitle">
          <p className="mb-2 fw-bold fs-3 text-center">{subjectAndCode}</p>
          <p className="mb-0 text-center">
            <b>Schedule: </b>
            {sched}
          </p>
          <div id="datePickerDiv">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={dateValue}
                onChange={handleDateChange}
                disableFuture={true}
                renderInput={(params) => (
                  <input
                    {...params.inputProps}
                  />
                )}
              >
              </DatePicker>
            </LocalizationProvider>
          </div>
        </div>

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
            >
            </UploadClassPicture>
          </Col>
       </Row>

        <DailyAttendance
          handleManualAttendance = {handleManualAttendance}
          filteredInfo={filteredInfo}
        />
      </Tab>

      {/* Attendance Summary Tab */}
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

        <AttendanceSummaryTable info={filteredInfo}></AttendanceSummaryTable>
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

        <ManageStudents sortedData={sortedData} attendanceData={attendanceData}></ManageStudents>
      </Tab>
    </Tabs>
  );
};

export default AttendanceTabs;
