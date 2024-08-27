import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

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
        {/* <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header> */}

        <Modal.Title
            style={{
              display: "flex",
              justifyContent: "center",
            }}
        >
          Add Student
        </Modal.Title>

        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>ID Number</Form.Label>
            <Form.Control placeholder="Enter ID Number"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control placeholder="Enter Name"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Course and Year</Form.Label>
            <Form.Control placeholder="Enter Course and Year"/>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email Address </Form.Label>
            <Form.Control type="email" placeholder="Enter Email Address"/>
          </Form.Group>

          <Form.Group className="mb-3">
             <Form.Label>Status</Form.Label>
             <Form.Select aria-label="Select Status">
              <option>Select Status</option>
              <option value="1">Enrolled</option>
              <option value="2">Reserved</option>
            </Form.Select>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
              Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
              Add to Class
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddStudent;