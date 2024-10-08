import React, { useState } from "react";
import { Button, Modal, Col, Form, Row } from "react-bootstrap";
import { TbUserEdit } from "react-icons/tb";
import "../css/style.css";

const EditStudent = ({ handleEditStudent, selectValue, selectedNames }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
       <Button
          variant="success"
          className="me-2 add-student-btn"
          id="add-student-btn"
          onClick={handleShow}
          disabled={selectValue.length !== 1}
        >
          <TbUserEdit className="fs-4" />
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
          Edit Student
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
                  // placeholder="Enter ID Number"
                  id="formInput"
                  // value={newStudent.idNumber}
                  // onChange={(e) =>
                  //   setNewStudent({ ...newStudent, idNumber: e.target.value })
                  // }
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
                  // placeholder="Enter Name"
                  id="formInput"
                  // value={newStudent.name}
                  // onChange={(e) =>
                  //   setNewStudent({ ...newStudent, name: e.target.value })
                  // }
                  required
                />
              </Col>
            </Form.Group>
          </Form>

          <div id="buttondiv" className="text-center">
            <Button
              className="text-white fw-bold mb-4"
              id="addButton"
              onClick={handleEditStudent}
            >
              Save Changes
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditStudent;
