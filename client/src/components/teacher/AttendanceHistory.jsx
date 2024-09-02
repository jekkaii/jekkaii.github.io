import React, { useState } from "react";
import {
  Button,
  Table,
  Dropdown,
  DropdownButton,
  Container,
  Row,
  Col,
} from "react-bootstrap";

const AttendanceHistory = () => {
  const [selectedDate, setSelectedDate] = useState("09/23/23");
  const [statusFilter, setStatusFilter] = useState("All");

  const handleDateSelect = (date) => setSelectedDate(date);
  const handleStatusFilterSelect = (status) => setStatusFilter(status);

  // Dummy data for the table
  const attendanceData = [
    {
      id: 1,
      name: "Dela Cruz, Juan",
      email: "2220821@slu.edu.ph",
      course: "BSIT",
      status: "Present",
      date: "09/23/23",
    },
    {
      id: 2,
      name: "Escobar, Juan",
      email: "2220848@slu.edu.ph",
      course: "BSIT",
      status: "Present",
      date: "09/23/23",
    },
    {
      id: 3,
      name: "Flores, Juan",
      email: "2220821@slu.edu.ph",
      course: "BSIT",
      status: "Absent",
      date: "09/23/23",
    },
    {
      id: 4,
      name: "Gomez, Juan",
      email: "2220848@slu.edu.ph",
      course: "BSIT",
      status: "Absent",
      date: "09/22/23",
    },
    {
      id: 5,
      name: "Hernandez, Juan",
      email: "2220848@slu.edu.ph",
      course: "BSIT",
      status: "Absent",
      date: "09/22/23",
    },
    {
      id: 6,
      name: "Gomez, Juan",
      email: "2220848@slu.edu.ph",
      course: "BSIT",
      status: "Absent",
      date: "09/22/23",
    },
  ];

  const filteredData = attendanceData.filter(
    (entry) =>
      (statusFilter === "All" || entry.status === statusFilter) &&
      entry.date === selectedDate
  );

  return (
    <Container className="attendance-container">
      <Row className="attendance-header">
        <Col className="text-center">
          {/* Directly apply the text-center class here */}
          <h1 className="attendance-h1">ATTENDANCE LIST</h1>
          <h2 className="attendance-h2">Subject & Class Code: IT 222 - 9451</h2>
          <p className="attendance-h3">Schedule: 7:30 - 9:00 AM - TThS</p>
        </Col>
      </Row>

      <Row className="justify-content-between align-items-center my-4">
        <Col xs="auto">
          <DropdownButton
            id="date-dropdown"
            title={selectedDate}
            onSelect={handleDateSelect}
          >
            <Dropdown.Item eventKey="09/23/23">09/23/23</Dropdown.Item>
            <Dropdown.Item eventKey="09/22/23">09/22/23</Dropdown.Item>
            <Dropdown.Item eventKey="10/24/23">10/24/23</Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs="auto">
          <Button variant="primary">View Link</Button>
          <Button variant="primary" className="ms-2">
            Download
          </Button>
        </Col>
      </Row>

      <div className="attendance-table">
        <Table striped bordered hover className="attendance-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>
                <DropdownButton
                  id="filter-dropdown"
                  title={statusFilter}
                  onSelect={handleStatusFilterSelect}
                >
                  <Dropdown.Item eventKey="All">All</Dropdown.Item>
                  <Dropdown.Item eventKey="Present">Present</Dropdown.Item>
                  <Dropdown.Item eventKey="Absent">Absent</Dropdown.Item>
                </DropdownButton>
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((entry) => (
              <tr key={entry.id}>
                <td>{entry.name}</td>
                <td>{entry.email}</td>
                <td>{entry.course}</td>
                <td>{entry.status}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default AttendanceHistory;
