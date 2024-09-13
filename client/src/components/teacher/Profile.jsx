import React from 'react';
import { Form, Row, Col, Button, Container, Image } from 'react-bootstrap';
import '../css/style.css';
import defaultProfile from '../resources/default.png';

const Profile = () => {
  const name = "Juan Dela Cruz";
  const email = "jdelacruz@slu.edu.ph";

  const handleSave = () => {
    console.log('Save Changes clicked');
  }

  const handleCancel = () => {
    console.log('Cancel clicked');
  }

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="w-100">
        <Col md={4} className="d-flex justify-content-center align-items-center mb-4 mb-md-0">
          <Image 
            src={defaultProfile} 
            className="img-fluid" 
            id="profile-image" 
            roundedCircle
          />
        </Col>
        <Col md={8}>
          <Form id="formBody">
            <Form.Group as={Row} className="ms-3 me-3 profile" controlId="formHorizontalName">
              <Form.Label className="fw-bold fs-5" column sm={4}>Name:</Form.Label>
              <Col sm={8}>
                <Form.Control value={name} id="formInput" disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="ms-3 me-3 profile" controlId="formHorizontalEmail">
              <Form.Label className="fw-bold fs-5" column sm={4}>Email:</Form.Label>
              <Col sm={8}>
                <Form.Control type="email" value={email} id="formInput" disabled />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="ms-3 me-3 profile" controlId="formHorizontalCurrent">
              <Form.Label className="fw-bold fs-5" column sm={4}>Current Password:</Form.Label>
              <Col sm={8}>
                <Form.Control type="password" placeholder="********" id="formInput" required />
              </Col>
            </Form.Group>
           
            <Form.Group as={Row} className="ms-3 me-3 profile" controlId="formHorizontalNew">
              <Form.Label className="fw-bold fs-5" column sm={4}>New Password:</Form.Label>
              <Col sm={8}>
                <Form.Control type="password" placeholder="********" id="formInput" required />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="ms-3 me-3 profile" controlId="formHorizontalConfirm">
              <Form.Label className="fw-bold fs-5" column sm={4}>Confirm Password:</Form.Label>
              <Col sm={8}>
                <Form.Control type="password" placeholder="********" id="formInput" required />
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <Col xs={12} className="text-center mt-4 mb-3">
          <Button 
            id="saveButton" 
            className="fw-bold" 
            variant="primary" 
            onClick={handleSave}
          >
            Save Changes
          </Button>
          <Button 
            id="cancelProfile" 
            className="fw-bold" 
            variant="danger" 
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
