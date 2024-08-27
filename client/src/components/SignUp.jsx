/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Helps in navigating different routes inside application

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/signup", { name, email, password })
      .then((result) => {
        if (result.status === 201) {
          navigate("/");
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          window.alert("Email already exists. Please use a different email");
        } else {
          console.log(err);
        }
      });
  };

  return (
    <MDBContainer fluid>
      <MDBCard className="text-black m-5" style={{ borderRadius: "25px" }}>
        <MDBCardBody>
          <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
            Sign up
          </p>

          <form onSubmit={handleSignup}>
            <div className="d-flex flex-row align-items-center mb-4 ">
              <MDBIcon fas icon="user me-3" size="lg" />
              <MDBInput
                required
                onChange={(e) => setName(e.target.value)}
                autoComplete="Full Name"
                name="name"
                label="Your Name"
                id="form1"
                type="text"
                className="w-100"
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
              <h1 className="text-primary">FORM</h1>
              <MDBIcon fas icon="envelope me-3" size="lg" />
              <MDBInput
                onChange={(e) => setEmail(e.target.value)}
                required
                name="email"
                autoComplete="Emailç"
                label="Your Email"
                id="form2"
                type="email"
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="lock me-3" size="lg" />
              <MDBInput
                required
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                label="Password"
                id="form3"
                type="password"
              />
            </div>
            <div className="d-flex flex-row align-items-center mb-4">
              <MDBIcon fas icon="key me-3" size="lg" />
              <MDBInput
                required
                name="repeatpassword"
                label="Repeat your password"
                id="form4"
                type="password"
              />
            </div>
            <div className="mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Subscribe to our newsletter"
              />
            </div>
            <MDBBtn type="submit">Register</MDBBtn>
          </form>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default SignUp;
