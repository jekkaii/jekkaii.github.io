import { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useAuthStore } from "../authentication/authStore";
import logo from "../components/resources/SLU Logo.png"; // Update the path to your logo image
import "../components/css/style.css"; // Import the CSS file

const LoginForm = () => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Initialize authStore
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(idNumber, password);
  };

  return (
    <MDBContainer className="login-contain">
      {!userType ? (
        // Selection screen
        <div className="selection-screen text-center">
          <img src={logo} alt="University Logo" className="logo" />
          <h4>Please select your role</h4>
          <div className="role-selection">
            <MDBBtn
              className="select-btn role-card"
              onClick={() => setUserType("Teacher")}
            >
              Teacher
            </MDBBtn>
            <MDBBtn
              className="select-btn role-card"
              onClick={() => setUserType("Admin")}
            >
              Admin
            </MDBBtn>
          </div>
        </div>
      ) : (
        // Login form
        <>
          <div className="text-center mb-4">
            <img src={logo} alt="University Logo" className="logo" />
          </div>
          <h4 className="text-center mb-4">Login to your account</h4>
          <form onSubmit={handleLogin}>
            <MDBInput
              required
              onChange={(e) => setIdNumber(e.target.value)}
              wrapperClass="mb-4"
              autoComplete="username"
              name="idNumber"
              label="ID Number"
              id="idNumber"
              type="text"
              value={idNumber}
              labelClass="input-label" // Add custom label class
            />
            <div className="input-wrapper mb-4">
              <MDBInput
                required
                onChange={(e) => setPassword(e.target.value)}
                wrapperClass="mb-4"
                name="password"
                label="Password"
                id="password"
                type={showPassword ? "text" : "password"} // Toggle password visibility
                value={password}
                labelClass="input-label" // Add custom label class
              />
              <span
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
            <div className="text-end mb-4">
              <a href="#!" className="small">
                Forgot Password?
              </a>
            </div>
            <MDBBtn type="submit" className="mb-4 w-100">
              Login
            </MDBBtn>
          </form>
        </>
      )}
    </MDBContainer>
  );
};

export default LoginForm;
