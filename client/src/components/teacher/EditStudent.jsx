import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Button, Modal, Alert} from "antd";
import "../css/style.css";

const EditStudent = ({ isOpen, onClose, onConfirm, error, idNumber, name }) => {
  return (
    <>
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={null}
        width={550}
      >
        <h2 
          className="attendance-header" 
          style={{ marginBottom: "30px" }}
        >
          Edit Student
        </h2>

        {/* Error Message from the Server */}
        {error && (
          <Alert className="mb-3" message={error} type="error" showIcon />
        )}

          <Form id="formBody">
            <Form.Group
              as={Row}
              className="mb-2"
            >
              <Form.Label className="fw-bold" column sm={3}>
                ID Number:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  defaultValue={idNumber || ""} 
                  // onChange={(e) =>
                  //   setNewStudent({ ...newStudent, idNumber: e.target.value })
                  // }
                  required
                  disabled
                />
              </Col>
            </Form.Group>

            <Form.Group
              as={Row}
              className="mb-3"
            >
              <Form.Label className="fw-bold" column sm={3}>
                Name:
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  defaultValue={name || ""}
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
              variant="primary"
              type="submit"
              className="edit-student-button"
              onClick={onConfirm}
            >
              Save Changes
            </Button>
          </div>
      </Modal>
    </>
  );
};

export default EditStudent;
