import React from 'react';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import '../css/style.css';
import uploadIcon from '../resources/Upload.png';

const UploadClassPicture = () => {
  const subjectAndCode = " IT 222  -  9451";
  const sched = "TThS (7:30 - 9:00 AM)";
  const date = "April 22, 2024";

   // const [file, setFile] = useState();
  //   function handleChange(e) {
  //       console.log(e.target.files);
  //       setFile(URL.createObjectURL(e.target.files[0]));
  //   }

  const handleClose = () => {
    console.log('Button clicked');
  }
  
  return (
    <>
      <Container 
        className="d-flex flex-column justify-content-center align-items-center vh-100"
        id="uploadContainer"
      >
        <p className="mb-5 fw-bold fs-2">Upload Class Picture</p>
        <p className="mb-0 text-center fs-5"><b>Subject and Class Code: </b>{subjectAndCode}</p>
        <p className="mb-0 text-center fs-5"><b>Schedule: </b>{sched}</p>
        <p className="mb-5 text-center fs-5"><b> Date: </b>{date}</p>
       
        <div className="text-center" id="uploadCard">
          <div className="d-flex justify-content-center">
            <img className="img-fluid mt-5" variant="top" src={uploadIcon} alt="upload icon" id="uploadIcon"/>
          </div>
          <div>
            <p className="fw-bold mb-1" id="drag">Drag and drop or click here to upload image.</p>
            <p className="mb-5" id="supports">Supports: JPEG, JPG, and PNG</p>
          </div>
        </div>

        <div className="text-center">
          <Button id="submitButton" className="m-5 fw-bold" variant="primary" onClick={handleClose}>Submit</Button>
          <Button id="cancelButton" className="m-5 fw-bold" variant="danger" onClick={handleClose}>Cancel</Button>
        </div>
      </Container>
    </>
  );
}

export default UploadClassPicture;
