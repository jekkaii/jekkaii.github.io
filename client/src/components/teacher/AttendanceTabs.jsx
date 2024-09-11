import React, { useState } from "react";
import {
  Button,
  Table,
  Tabs,
  Tab,
  Form,
  InputGroup,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { FiUpload } from "react-icons/fi";
import { FaCamera } from "react-icons/fa6";
import { TbFileUpload } from "react-icons/tb";
import { RiUserAddLine } from "react-icons/ri";
import { TiUserDeleteOutline } from "react-icons/ti";
import "../css/style.css";

const AttendanceTabs = () => {
  const [key, setKey] = useState("daily");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);

  const subjectAndCode = " IT 222  -  9451";
  const sched = "TThS (7:30 - 9:00 AM)";
  const date = "April 22, 2024";

  // Dummy Data
  const [attendanceData, setAttendanceData] = useState([
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

  const handleClick = (id) => {
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

  const filteredData = attendanceData.filter(
    (entry) => statusFilter === "All" || entry.status === statusFilter
  );

  const handleSelectAll = () => {
    const allSelected = !selectAll;
    setSelectAll(allSelected);
    setSelectedStudents(
      allSelected ? attendanceData.map((student) => student.id) : []
    );
  };

  const handleStudentSelect = (id) => {
    setSelectedStudents((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((studentId) => studentId !== id)
        : [...prevSelected, id]
    );
  };

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="daily" title="Daily Attendance">
        <div id="tabsTitle">
          <p className="mb-2 fw-bold fs-3 text-center">{subjectAndCode}</p>
          <p className="mb-0 text-center">
            <b>Schedule: </b>
            {sched}
          </p>
          <p className="mb-3 text-center">
            <b>Date: </b>
            {date}
          </p>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <Button className="me-4" id="camera">
            <FaCamera className="fs-4" />
          </Button>
          <Button id="fiUpload">
            <FiUpload className="fs-4" />
          </Button>
        </div>
        <div className="d-flex justify-content-center">
          <Table
            striped
            bordered
            hover
            className="attendance-table text-center"
            id="dailyTable"
          >
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.idNumber}</td>
                  <td>{entry.name}</td>
                  <td>
                    <Button
                      onClick={() => handleClick(entry.id)}
                      className={`button ${
                        entry.status === "Absent" ? "absent" : ""
                      }`}
                      id="statusButton"
                    >
                      {entry.status}
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={2}></td>
                <td>
                  <Button
                    id="saveDaily"
                    className="text-end fw-bold"
                    variant="primary"
                  >
                    Save
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Tab>
      <Tab eventKey="summary" title="Attendance Summary">
        <div id="tabsTitle">
          <p className="mb-2 fw-bold fs-3 text-center">{subjectAndCode}</p>
          <p className="mb-0 text-center">
            <b>Schedule: </b>
            {sched}
          </p>
          <p className="mb-3 text-center">
            <b>Date: </b>
            {date}
          </p>
        </div>
        <div className="d-flex justify-content-center">
          <Table
            striped
            bordered
            hover
            className="attendance-table text-center"
            id="dailyTable"
          >
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Name</th>
                <th>Number of Absences</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((entry) => (
                <tr key={entry.id}>
                  <td>{entry.idNumber}</td>
                  <td>{entry.name}</td>
                  <td>{entry.absencesDates.length}</td>
                  <td>V</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Tab>
      <Tab eventKey="manage" title="Manage Students">
        <div id="tabsTitle">
          <p className="mb-2 fw-bold fs-3 text-center">{subjectAndCode}</p>
          <p className="mb-0 text-center">
            <b>Schedule: </b>
            {sched}
          </p>
          <p className="mb-3 text-center">
            <b>Date: </b>
            {date}
          </p>
        </div>
        <div className="d-flex justify-content-between mb-3">
          <Form.Check
            type="checkbox"
            label="Select All"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <InputGroup className="search-bar">
            <DropdownButton
              variant="outline-secondary"
              title={statusFilter}
              id="filterDropdown"
              onSelect={(e) => setStatusFilter(e)}
            >
              <Dropdown.Item eventKey="All">All</Dropdown.Item>
              <Dropdown.Item eventKey="Present">Present</Dropdown.Item>
              <Dropdown.Item eventKey="Absent">Absent</Dropdown.Item>
            </DropdownButton>
            <Form.Control placeholder="Search" />
            <Button variant="outline-secondary">
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
          <div>
            <Button variant="success" className="me-2 upload-btn">
              <TbFileUpload className="fs-4" />
            </Button>
            <Button variant="success" className="me-2 add-student-btn">
              <RiUserAddLine className="fs-4" />
            </Button>
            <Button variant="danger" className="delete-student-btn">
              <TiUserDeleteOutline className="fs-4" />
            </Button>
          </div>
        </div>
        <div className="attendance-table">
          <Table striped bordered hover className="attendance-table">
            <thead>
              <tr>
                <th>ID Number</th>
                <th>Name</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((student) => (
                <tr key={student.id}>
                  <td>{student.idNumber}</td>
                  <td>{student.name}</td>
                  <td>{student.status}</td>
                  <td>
                    <Form.Check
                      type="checkbox"
                      checked={selectedStudents.includes(student.id)}
                      onChange={() => handleStudentSelect(student.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Tab>
    </Tabs>
  );
};

export default AttendanceTabs;
