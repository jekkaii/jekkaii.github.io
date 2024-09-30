import { useState } from 'react';
import { Button, Modal, Col, Form, Row }from 'react-bootstrap';
import { LuFileEdit } from "react-icons/lu";
import '../css/style.css';

const EditUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} id="edit">
        <LuFileEdit 
          className='fs-3'
          style={{ color: '#2a1f7e'}}
          />
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
            className="fs-2 m-3 fw-bold"
            id="editTitle"
        >
          Edit User
        </Modal.Title>

        <Modal.Body>
            <Form id="formBody">
              <Form.Group as={Row} className="mb-2" controlId="formHorizontalFirstName">
                <Form.Label className="fw-bold" column sm={3}>First Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control placeholder="Enter First Name" id="formInput" required/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2" controlId="formHorizontalLastName">
                <Form.Label className="fw-bold" column sm={3}>Last Name:</Form.Label>
                <Col sm={9}>
                  <Form.Control placeholder="Enter Last Name" id="formInput" required/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2" controlId="formHorizontalEmail">
                <Form.Label className="fw-bold" column sm={3}>Email:</Form.Label>
                <Col sm={9}>
                  <Form.Control type="email" placeholder="Enter Email Address" id="formInput" required/>
                </Col>
              </Form.Group>

              {/* <Form.Group as={Row} className="mb-2" controlId="formHorizontalNewPassword">
                <Form.Label className="fw-bold" column sm={3}>New Password:</Form.Label>
                <Col sm={9}>
                  <Form.Control type="email" placeholder="Enter New Password" id="formInput" required/>
                </Col>
              </Form.Group> */}

              <Form.Group as={Row} className="mb-2">
                <Form.Label className="fw-bold" as="legend" column sm={3}>Role:</Form.Label>
                <Col sm={3}>
                <Form.Check
                  type="radio"
                  label="Admin"
                  className="formHorizontalRadios"
                  id="formHorizontalRole1"
                />
                <Form.Check
                  type="radio"
                  label="Employee"
                  className="formHorizontalRadios"
                  id="formHorizontalRole2"
                  required
                />
                </Col>
              </Form.Group>

              {/* <Form.Group as={Row} className="mb-2">
                <Form.Label className="fw-bold" as="legend" column sm={3}>Account Status:</Form.Label>
                <Col sm={3}>
                <Form.Check
                  type="radio"
                  label="Active"
                  className="formHorizontalRadios"
                  id="formHorizontalStatus1"
                  required
                />
                <Form.Check
                  type="radio"
                  label="Deactivated"
                  className="formHorizontalRadios"
                  id="formHorizontalStatus2"
                />
                </Col>
              </Form.Group> */}
            </Form>

          <div id="buttondiv" className="text-center">
            <Button 
              className="text-white fw-bold mb-4"
              id="editButton"
              onClick={handleClose}
              >
                Edit User
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditUser;