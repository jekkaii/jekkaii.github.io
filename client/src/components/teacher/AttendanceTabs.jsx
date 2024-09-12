import React, { useState } from "react";
import {
  Button,
  Table,
  Tabs,
  Tab,
  Form,
  InputGroup,
  Modal,
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
  const [modalShow, setModalShow] = useState(false);
  const [newStudentId, setNewStudentId] = useState("");
  const [newStudentName, setNewStudentName] = useState("");
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
    (entry) =>
      (statusFilter === "All" || entry.status === statusFilter) &&
      (entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.idNumber.includes(searchTerm))
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

  const handleAddStudent = () => {
    setModalShow(true);
  };

  const handleSaveStudent = () => {
    if (newStudentId && newStudentName) {
      setAttendanceData((prevData) => [
        ...prevData,
        {
          id: prevData.length + 1,
          idNumber: newStudentId,
          name: newStudentName,
          status: "Present",
          absencesDates: [],
        },
      ]);
      setModalShow(false);
      setNewStudentId("");
      setNewStudentName("");
    } else {
      alert("Please enter both ID Number and Name.");
    }
  };

  const handleDeleteStudent = () => {
    setAttendanceData((prevData) =>
      prevData.filter((student) => !selectedStudents.includes(student.id))
    );
    setSelectedStudents([]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("File uploaded:", file);
    // Implement file upload logic
  };

  const handleSave = () => {
    console.log("Save Clicked", attendanceData);
    //send the data to a backend server or log changes
  };

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

      {/* Attendance Summary Tab */}
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
                  <td>V</td> {/* Edit to be an expandable button */}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Tab>

      {/* Manage Students Tab */}
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

        {/* Search, Add, Delete and File Upload buttons */}
        <div className="form-check-label">
          <Form.Check
            type="checkbox"
            label="Select"
            checked={selectAll}
            onChange={handleSelectAll}
          />
          <InputGroup className="mb-3 search-bar">
            <Form.Control
              placeholder="Search by ID or Name"
              className="custom-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>
          <div>
            <input
              type="file"
              accept=".csv, .xlsx"
              onChange={handleFileUpload}
              style={{ display: "none" }}
              id="fileUpload"
            />
            <Button
              variant="success"
              className="me-2 upload-btn"
              onClick={() => document.getElementById("fileUpload").click()}
            >
              <TbFileUpload className="fs-4" />
            </Button>
            <Button
              variant="success"
              className="me-2 add-student-btn"
              onClick={handleAddStudent}
            >
              <RiUserAddLine className="fs-4" />
            </Button>
            <Button
              variant="danger"
              className="me-2 delete-student-btn"
              onClick={handleDeleteStudent}
              disabled={selectedStudents.length === 0}
            >
              <TiUserDeleteOutline className="fs-4" />
            </Button>
          </div>
        </div>

        {/* Students Table */}
        <Table
          striped
          bordered
          hover
          className="attendance-table text-center"
          id="dailyTable"
        >
          <thead>
            <tr>
              <th></th>
              <th>ID Number</th>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((student) => (
              <tr key={student.id}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectedStudents.includes(student.id)}
                    onChange={() => handleStudentSelect(student.id)}
                  />
                </td>
                <td>{student.idNumber}</td>
                <td>{student.name}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <div className="button-container">
          <Button id="saveButton" className="fw-bold" onClick={handleSave}>
            Save
          </Button>
        </div>

        {/* Add Student Modal */}
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add Student</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formStudentId">
                <Form.Label>ID Number:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter ID Number"
                  value={newStudentId}
                  onChange={(e) => setNewStudentId(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formStudentName" className="mt-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Name"
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveStudent}>
              Add to Class
            </Button>
          </Modal.Footer>
        </Modal>
      </Tab>
    </Tabs>
  );
};

export default AttendanceTabs;
