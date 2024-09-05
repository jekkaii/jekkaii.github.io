import React from 'react';
import { Form, Row, Col, Button, Container, Image } from 'react-bootstrap';
import '../css/style.css';
import defaultProfile from '../resources/default.png';

const Profile = () => {
  const name = "Juan Dela Cruz";
  const email = "jdelacruz@slu.edu.ph";
  const current = "********";
  const newPassword = "********";
  const confirm = "********";

  const handleClose = () => {
    console.log('Button clicked');
  }

  return (
    <Container 
      className="d-flex justify-content-center align-items-center vh-100"
    >
      <Row className="w-100">
        <Col md={4} className="d-flex justify-content-center align-items-center">
          <Image src={defaultProfile} roundedCircle className="img-fluid" id="profile-image"/>
        </Col>
        <Col md={8}>
          <Form id="formBody">
            <Form.Group as={Row} className="mb-4" controlId="formHorizontalName">
              <Form.Label className="fw-bold fs-5" column sm={4}>Name:</Form.Label>
              <Col sm={6}>
                <Form.Control placeholder={name} id="formInput" disabled/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formHorizontalEmail">
              <Form.Label className="fw-bold fs-5" column sm={4}>Email:</Form.Label>
              <Col sm={6}>
                <Form.Control type="email" placeholder={email} id="formInput" disabled/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formHorizontalCurrent">
              <Form.Label className="fw-bold fs-5" column sm={4}>Current Password:</Form.Label>
              <Col sm={6}>
                <Form.Control type="password" placeholder={current} id="formInput" required/>
              </Col>
            </Form.Group>
           
            <Form.Group as={Row} className="mb-4" controlId="formHorizontalNew">
              <Form.Label className="fw-bold fs-5" column sm={4}>New Password:</Form.Label>
              <Col sm={6}>
                <Form.Control type="password" placeholder={newPassword} id="formInput" required/>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-4" controlId="formHorizontalConfirm">
              <Form.Label className="fw-bold fs-5" column sm={4}>Confirm Password:</Form.Label>
              <Col sm={6}>
                <Form.Control type="password" placeholder={confirm} id="formInput" required/>
              </Col>
            </Form.Group>
          </Form>
        </Col>
        <div className="text-center">
            <Button id="saveButton" className="m-5 fw-bold" variant="primary" onClick={handleClose}>Save Changes</Button>
            <Button id="cancelProfile" className="m-5 fw-bold" variant="danger" onClick={handleClose}>Cancel</Button>
        </div>
      </Row>
    </Container>
  );
}

export default Profile;
