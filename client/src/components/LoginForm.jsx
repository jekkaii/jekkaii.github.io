import axios from "axios";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SetIsLoggedInContext } from "../App";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setIsLoggedIn = useContext(SetIsLoggedInContext);
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:3001/api/auth/",
        { email, password },
        { withCredentials: true }
      )
      .then((result) => {
        if (result.status === 200) {
          axios
            .get("http://localhost:3001/user", { withCredentials: true })
            .then((response) => {
              if (response.data.user) {
                setIsLoggedIn(true);
                navigate("/home", { state: { user: response.data.user } });
              }
            });
        }
      })
      .catch((err) => {
        if (err.status === 404) {
          window.alert("Login failed: User does not exist");
        } else {
          window.alert("Login failed: Password is incorrect");
        }
      });
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
