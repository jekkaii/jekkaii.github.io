/* eslint-disable no-unused-vars */
import axios from "axios";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useState } from "react";
import { useAuthStore } from "../authentication/authStore";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Initialize authStore
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
  };
  return (
    <>
      <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
        <h1 className="d-flex justify-content-center">Temporary Login</h1>
        <br />
        <form onSubmit={handleLogin}>
          <MDBInput
            required
            onChange={(e) => setEmail(e.target.value)}
            wrapperClass="mb-4"
            autoComplete="email"
            name="email"
            label="Email"
            id="form1"
            type="email"
          />
          <MDBInput
            required
            onChange={(e) => setPassword(e.target.value)}
            wrapperClass="mb-4"
            name="password"
            label="Password"
            id="form2"
            type="password"
          />
          <div className="row mb-4">
            <div className="col-md-6 d-flex justify-content-center">
              <div className="form-check mb-3 mb-md-0">
                <input
                  className="form-check-input"
                  type="checkbox"
                  value=""
                  id="loginCheck"
                />
                <label className="form-check-label" htmlFor="loginCheck">
                  Remember me
                </label>
              </div>
            </div>

            <div className="col-md-6 d-flex justify-content-center">
              <a href="#!">Forgot password?</a>
            </div>
          </div>
          <MDBBtn type="submit" className="mb-4">
            Sign in
          </MDBBtn>
        </form>
        <div className="text-center">
          <p>
            Not a member? <a href="/signup">Register</a>
          </p>
        </div>
      </MDBContainer>
    </>
  );
};

export default LoginForm;
