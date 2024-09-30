import React from 'react';
import { useState } from 'react';
import { Button, Table, Form, InputGroup, Row, Col } from "react-bootstrap";
import { TbFileUpload } from "react-icons/tb";
import { TiUserDelete } from "react-icons/ti";
import AddStudent from './AddStudent';
import "../css/style.css"; 
import Confirmation from './Confirmation'; 

const ManageStudents = ({ sortedData, attendanceData }) => {
  const [selectAll, setSelectAll] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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

  const handleDeleteStudent = () => {
    setAttendanceData((prevData) =>
      prevData.filter((student) => !selectedStudents.includes(student.id))
    );
    setSelectedStudents([]);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("File uploaded:", file);
  };

  const handleSave = () => {
    console.log("Save Clicked", attendanceData);
  };

  const handleDeleteStudentConfirmation = () => {
    if (selectAll) {
      setModalMessage('Are you sure you want to delete all students from this class?');
    } else {
      const selectedNames = sortedData
        .filter(student => selectedStudents.includes(student.id))
        .map((student, index) => (
          <React.Fragment key={student.id}>
            {index + 1}. {student.name} <br />
          </React.Fragment>
        ));
  
      setModalMessage(
        <React.Fragment>
          Are you sure you want to delete the following student/s from the class?
          <br />
          {selectedNames}
        </React.Fragment>
      );
    }
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage('');
  };

  return (
    <>
      {/* Search, Add, Delete and File Upload buttons */}
      <Row className="align-items-end mb-0 mt-5">
        <Col xs={7} className="p-0"></Col>
        <Col xs={5} className="d-flex justify-content-end p-0">
          <InputGroup className="search-bar">
            <Form.Control
              placeholder="Search by ID Number or Name"
              className="custom-search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </InputGroup>

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

          <AddStudent />

          <Button
            variant="danger"
            className="me-2 delete-student-btn"
            onClick={handleDeleteStudentConfirmation}
            disabled={selectedStudents.length === 0}
          >
            <TiUserDelete className="fs-4" />
          </Button>
        </Col>
      </Row>

      {/* Confirmation Modal */}
      <Confirmation
        isOpen={isModalOpen}
        onClose={closeModal}
        message={modalMessage}
      />

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
            <th>
              <Form.Check
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
            </th>
            <th>ID Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {sortedData
            .filter((entry) => {
              return searchTerm.toLowerCase() === ''
              ? entry
              : entry.name.toLowerCase().includes(searchTerm) || entry.idNumber.includes(searchTerm);
            }).map((student) => (
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
          <tr>
            <td colSpan={2}></td>
            <td>
              <Button
                id="saveManageStudents"
                className="text-end fw-bold"
                variant="primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default ManageStudents;
