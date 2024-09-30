import React, { useState } from "react";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
import { TiUserAdd } from "react-icons/ti";
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
          className="me-2 add-student-btn"
          id="add-student-btn"
          onClick={handleShow}
        >
          <TiUserAdd className="fs-4" />
        </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>

        <Modal.Title
          style={{
            display: "flex",
            justifyContent: "center",
          }}
          className="fs-2 m-3 fw-bold"
          id="addTitle"
        >
          Add Student
        </Modal.Title>

        <Modal.Body>
          <Form id="formBody">
            <Form.Group
              as={Row}
              className="mb-2"
              controlId="formHorizontalIDNum"
            >
              <Form.Label className="fw-bold" column sm={4}>
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
              className="mb-3"
              controlId="formHorizontalName"
            >
              <Form.Label className="fw-bold" column sm={4}>
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
              className="text-white fw-bold mb-4"
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
