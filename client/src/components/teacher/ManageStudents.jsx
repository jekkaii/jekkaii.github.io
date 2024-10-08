/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Button, Table, Form, InputGroup, Row, Col } from "react-bootstrap";
import { TbFileUpload } from "react-icons/tb";
import { AiOutlineUserDelete } from "react-icons/ai";
import { useStudentStore } from "../../stores/studentStore";
import AddStudent from "./AddStudent";
import "../css/style.css";
import Confirmation from "./Confirmation";
import EditStudent from "./EditStudent";

const ManageStudents = ({ sortedData, attendanceData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectValue, setSelectValue] = useState([]);
  const { de, students, isLoading, error } = useStudentStore();

  // Check if all students are selected
  const isAllSelected =
    sortedData.length > 0 && selectValue.length === sortedData.length;

  // Handle individual checkbox and select all
  const handleCheck = (id) => {
    if (id === "all") {
      if (isAllSelected) {
        setSelectValue([]);
      } else {
        setSelectValue(sortedData.map((student) => student.idNumber));
      }
    } else {
      if (selectValue.includes(id)) {
        setSelectValue(selectValue.filter((studentId) => studentId !== id));
      } else {
        setSelectValue([...selectValue, id]);
      }
    }
  };

  const handleEditStudent = () => {
    // // add here code for edit student
    // handleClose();
  };
  // add here code for delete student

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    console.log("File uploaded:", file);
  };

  const handleSave = () => {
    console.log("Save Clicked", attendanceData);
  };

  // Handle delete modal confirmation
  const handleDeleteStudentConfirmation = () => {
    if (isAllSelected) {
      setModalMessage(
        "Are you sure you want to delete all students from this class?"
      );
    } else {
      const selectedNames = sortedData
        .filter((student) => selectValue.includes(student.idNumber))
        .map((student, index) => (
          <React.Fragment key={student.idNumber}>
            {index + 1}. {student.name} <br />
          </React.Fragment>
        ));
      setModalMessage(
        <React.Fragment>
          Are you sure you want to delete the following student/s from the
          class?
          <br />
          {selectedNames}
        </React.Fragment>
      );
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
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

          <EditStudent
            handleEditStudent={handleEditStudent}
            selectValue={selectValue}
          />

          <AddStudent
            onSuccess={() => {
              console.log("Add student success, refreshing table");
              window.location.reload();
            }}
          />

          <Button
            variant="danger"
            className="me-2 delete-student-btn"
            onClick={handleDeleteStudentConfirmation}
            disabled={selectValue.length === 0}
          >
            <AiOutlineUserDelete className="fs-4" />
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
                checked={isAllSelected}
                onChange={() => handleCheck("all")}
              />
            </th>
            <th>ID Number</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {sortedData
            .filter((entry) => {
              return searchTerm.toLowerCase() === ""
                ? entry
                : entry.name.toLowerCase().includes(searchTerm) ||
                    entry.idNumber.includes(searchTerm);
            })
            .map((student) => (
              <tr key={student.idNumber}>
                <td>
                  <Form.Check
                    type="checkbox"
                    checked={selectValue.includes(student.idNumber)}
                    onChange={() => handleCheck(student.idNumber)}
                  />
                </td>
                <td>{student.idNumber}</td>
                <td>{student.name}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
};

export default ManageStudents;
