import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const UploadClassPicture = () => {
  const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const subjectAndCode = '---';
  const sched = '---';
  const date = '---';

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Upload Class Picture
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Title
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Upload Class Picture
        </Modal.Title>

        <Modal.Body>
          <h5>Subject and Class Code: {subjectAndCode}</h5>
          <h5>Schedule: {sched}</h5>
          <h5>Date: {date}</h5>
          <input type="file" onChange={handleChange} />
          <img src={file} />
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UploadClassPicture;