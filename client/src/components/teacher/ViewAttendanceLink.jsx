import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import '../css/style.css';

const ViewAttendanceLink = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        View
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
            className="fs-1 m-5 fw-bold"
        >
          Attendance is ready!
        </Modal.Title>

        <Modal.Body>
          <div className="text-center">
            <Button id="viewLinkButton" className="mb-3 fw-bold" variant="primary" onClick={handleClose}>View Link</Button>
          </div>
          <div className="text-center">
            <Button id="downloadButton" className="mb-5 fw-bold" variant="danger" onClick={handleClose}>Download</Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ViewAttendanceLink;