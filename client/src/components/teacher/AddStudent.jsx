import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import "../css/style.css";

const AddStudent = ({ onAddStudent }) => {
  const [show, setShow] = useState(false);
  const [newStudent, setNewStudent] = useState({ idNumber: "", name: "" });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAddToClass = () => {
    
    if (newStudent.idNumber && newStudent.name) {
      onAddStudent(newStudent);
    }
    handleClose();
  };

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        className="me-2 add-student-btn"
      >
        Add Student
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>

        <Modal.Title
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="fs-1 m-4 fw-bold"
          id="addTitle"
        >
          Add Student
        </Modal.Title>

        <Modal.Body>
          <Form id="formBody">
            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formHorizontalIDNum"
            >
              <Form.Label className="fw-bold fs-5" column sm={4}>
                ID Number:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  placeholder="Enter ID Number"
                  id="formInput"
                  value={newStudent.idNumber}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, idNumber: e.target.value })
                  }
                  required
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-4"
              controlId="formHorizontalName"
            >
              <Form.Label className="fw-bold fs-5" column sm={4}>
                Name:
              </Form.Label>
              <Col sm={8}>
                <Form.Control
                  placeholder="Enter Name"
                  id="formInput"
                  value={newStudent.name}
                  onChange={(e) =>
                    setNewStudent({ ...newStudent, name: e.target.value })
                  }
                  required
                />
              </Col>
            </Form.Group>
          </Form>

          <div id="buttondiv" className="text-center">
            <Button
              className="text-white fw-bold fs-5"
              id="addButton"
              onClick={handleAddToClass}
            >
              Add to Class
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddStudent;
