import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import '../css/style.css';

const AddStudent = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
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
              <Form.Group as={Row} className="mb-4" controlId="formHorizontalIDNum">
                <Form.Label className="fw-bold fs-5" column sm={4}>ID Number:</Form.Label>
                <Col sm={8}>
                  <Form.Control placeholder="Enter ID Number" id="formInput"/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formHorizontalName">
                <Form.Label className="fw-bold fs-5" column sm={4}>Name:</Form.Label>
                <Col sm={8}>
                  <Form.Control placeholder="Enter Name" id="formInput"/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formHorizontalCourseYear">
                <Form.Label className="fw-bold fs-5" column sm={4}>Course and Year:</Form.Label>
                <Col sm={8}>
                  <Form.Control placeholder="Enter Course and Year" id="formInput"/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4" controlId="formHorizontalEmail">
                <Form.Label className="fw-bold fs-5" column sm={4}>Email:</Form.Label>
                <Col sm={8}>
                  <Form.Control type="email" placeholder="Enter Email Address" id="formInput"/>
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-4">
                <Form.Label className="fw-bold fs-5" as="legend" column sm={4}>Status:</Form.Label>
                <Col sm={8}>
                <Form.Check
                  type="radio"
                  label="Enrolled"
                  className="formHorizontalRadios"
                  id="formHorizontalStatus1"
                />
                <Form.Check
                  type="radio"
                  label="Reserved"
                  className="formHorizontalRadios"
                  id="formHorizontalStatus2"
                />
                </Col>
              </Form.Group>
            </Form>

          <div id="buttondiv" className="text-center">
            <Button 
              className="text-white fw-bold fs-5"
              id="addButton"
              onClick={handleClose}
              >
                Add to Class
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddStudent;