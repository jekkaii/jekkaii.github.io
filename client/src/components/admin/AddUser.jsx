import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/style.css';

const AddUser = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button id="addUserButton" onClick={handleShow} >
       + Add User
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
            id="addTitle"
        >
          Add User
        </Modal.Title>

        <Modal.Body>
            <Form id="formBody">
              <Form.Group as={Row} className="mb-2" controlId="formHorizontalFirstName">
                <Form.Label className="fw-bold" column sm={2}>First Name:</Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Enter First Name" id="formInput" required/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2" controlId="formHorizontalLastName">
                <Form.Label className="fw-bold" column sm={2}>Last Name:</Form.Label>
                <Col sm={10}>
                  <Form.Control placeholder="Enter Last Name" id="formInput" required/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2" controlId="formHorizontalEmail">
                <Form.Label className="fw-bold" column sm={2}>Email:</Form.Label>
                <Col sm={10}>
                  <Form.Control type="email" placeholder="Enter Email Address" id="formInput" required/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-2">
                <Form.Label className="fw-bold" as="legend" column sm={2} required>Role:</Form.Label>
                <Col sm={3}>
                <Form.Check
                  type="radio"
                  label="Admin"
                  className="formHorizontalRadios "
                  id="formHorizontalRole1"
                  required
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
            </Form>

          <div id="buttondiv" className="text-center">
            <Button 
              className="text-white fw-bold mb-4"
              id="addButton"
              onClick={handleClose}
              >
                Add User
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddUser;