import { useState } from "react";
import { MDBContainer, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import { useAuthStore } from "../authentication/authStore";
import logo from "../components/resources/SLU Logo.png"; // Update the path to your logo image
import "../components/css/style.css"; // Import the CSS file

const LoginForm = () => {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Initialize authStore
  const { login } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(idNumber, password);
  };

  return (
    <MDBContainer className="login-container d-flex flex-column justify-content-center align-items-center vh-100 no-shadow">
      <div className="text-center mb-4">
        <img src={logo} alt="University Logo" className="mb-4" style={{ width: '190px' }} />
      </div>
      <h4 className="text-center mb-4">Login to your account</h4>
      <form onSubmit={handleLogin} className="w-100" style={{ maxWidth: '400px' }}>
        
        {/* ID Number Input */}
        <div className="mb-4">
          <label htmlFor="idNumber" className="form-label">Username</label>
          <MDBInput
            required
            onChange={(e) => setIdNumber(e.target.value)}
            id="idNumber"
            type="text"
            value={idNumber}
            wrapperClass="w-100"
            className="form-control"
          />
        </div>

        {/* Password Input with Toggle */}
        <div className="mb-4 position-relative">
          <label htmlFor="password" className="form-label">Password</label>
          <MDBInput
            required
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            wrapperClass="w-100"
            className="form-control"
          />
          <span
            className="password-toggle position-absolute"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              top: '78%',
              right: '10px',
              cursor: 'pointer',
              transform: 'translateY(-50%)',
              color: '#007bff'
            }}
          >
            {showPassword ? "👁️" : "👁️‍🗨️"}
          </span>
        </div>

        {/* Forgot Password */}
        <div className="text-end mb-4">
          <a href="#!" className="small" style={{ color: '#007bff' }}>
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <MDBBtn type="submit" className="mb-5 w-100">
          Login
        </MDBBtn>
      </form>
    </MDBContainer>
  );
};

export default LoginForm;
