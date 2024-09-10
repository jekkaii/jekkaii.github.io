import React, { useState } from 'react';
import { Button, Table, Tabs, Tab } from 'react-bootstrap';
import { FiUpload } from "react-icons/fi";
import { FaCamera } from "react-icons/fa6";
import '../css/style.css';

const AttendanceTabs = () => {
  const [key, setKey] = useState('daily');
  const [statusFilter, setStatusFilter] = useState('All');

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
      absencesDates: ["August 13, 2024", "August 22, 2024", "September 3, 2024", "September 24, 2024"],
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
          ? { ...entry, status: entry.status === "Absent" ? "Present" : "Absent" }
          : entry
      )
    );
  };

  const filteredData = attendanceData.filter(
    (entry) => statusFilter === "All" || entry.status === statusFilter
  );

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
          <p className="mb-0 text-center"><b>Schedule: </b>{sched}</p>
          <p className="mb-3 text-center"><b>Date: </b>{date}</p>
        </div>
        <div className="d-flex justify-content-center mb-4">
          <Button className='me-4' id="camera">
            <FaCamera className='fs-4'/>
          </Button>
          <Button id="fiUpload">
            <FiUpload className='fs-4'/>
          </Button>
        </div>
        <div className="d-flex justify-content-center">
          <Table striped bordered hover className="attendance-table text-center" id="dailyTable">
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
                        className={`button ${entry.status === 'Absent' ? 'absent' : ''}`}
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
                  <Button id="saveDaily" className="text-end fw-bold" variant="primary">Save</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </Tab>
      <Tab eventKey="summary" title="Attendance Summary">
        <div id="tabsTitle">
          <p className="mb-2 fw-bold fs-3 text-center">{subjectAndCode}</p>
          <p className="mb-0 text-center"><b>Schedule: </b>{sched}</p>
          <p className="mb-3 text-center"><b>Date: </b>{date}</p>
        </div>
        <div className="d-flex justify-content-center">
          <Table striped bordered hover className="attendance-table text-center" id="dailyTable">
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
      <Tab eventKey="manage" title="Manage Students"> 
        {/* Insert code here for the manage students tab */}
        Tab content for Manage Students 
      </Tab>
    </Tabs>
  );
}

export default AttendanceTabs;
