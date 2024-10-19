/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import "../css/style.css";
import uploadIcon from "../resources/Upload.png";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadClassPicture = ({ date, subjectAndCode, schedule }) => {
  const [show, setShow] = useState(false);
  const [file, setFile] = useState();

  const handleClose = () => {
    setShow(false);
    setFile(undefined); // Reset the file state
  };

  const handleShow = () => setShow(true);

  const getFile = (event) => {
    setFile(URL.createObjectURL(event.target.files[0]));
  };

  return (
    <>
      <Button type="primary" onClick={handleShow}>
        <UploadOutlined className="fs-5" />
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
        <Modal.Body>
          <div className="text-center" id="uploadDescription">
            <p className="mb-4 fw-bold">Upload Class Picture</p>
            <p className="mb-0">
              <b>Subject and Class Code: </b>
              {subjectAndCode}
            </p>
            <p className="mb-0">
              <b>Schedule: </b>
              {schedule}
            </p>
            <p className="mb-5">
              <b> Date: </b>
              {date}
            </p>
          </div>

          <div className="text-center m-5" id="uploadCard">
            <label htmlFor="input-file" id="previewArea">
              <input
                type="file"
                accept="image/*"
                id="input-file"
                onChange={getFile}
                hidden
              />
              {!file && (
                <>
                  <img
                    className="img-fluid mt-5"
                    src={uploadIcon}
                    alt="upload icon"
                    id="uploadIcon"
                  />
                  <p className="fw-bold mb-1" id="drag">
                    Click here to upload image.
                  </p>
                  <p className="mb-5" id="supports">
                    Supports: JPEG, JPG, and PNG
                  </p>
                </>
              )}

              {file && (
                <img
                  src={file}
                  alt="Preview"
                  style={{
                    maxWidth: "100%",
                  }}
                />
              )}
            </label>
          </div>

          <div className="text-center">
            <Button
              id="submitButton"
              className="me-5 mb-4 fw-bold"
              variant="primary"
              onClick={handleClose}
            >
              Submit
            </Button>
            <Button
              id="cancelButton"
              className="mb-4 fw-bold"
              variant="danger"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UploadClassPicture;
