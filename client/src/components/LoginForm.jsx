import { useState } from "react";
import { MDBContainer, MDBInput } from "mdb-react-ui-kit";
import { useAuthStore } from "../authentication/authStore";
import logo from "../components/resources/SLU Logo.png"; // Update the path to your logo image
import "../components/css/style.css"; // Import the CSS file
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SpinnerLoaderV2 from "../components/LoginSipinner";
import "../components/css/style.css";

export default function LoginForm() {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility

  // Initialize authStore
  const { login } = useAuthStore();
  const { isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(idNumber, password);
  };

  return (
    <MDBContainer className="login-container d-flex flex-column justify-content-center align-items-center vh-100 no-shadow">
      <div className="text-center mb-4">
        <img
          src={logo}
          alt="University Logo"
          className="mb-4"
          style={{ width: "190px" }}
        />
      </div>
      <h4 className="text-center mb-4">Login to your account</h4>

      <form
        onSubmit={handleLogin}
        className="w-100"
        style={{ maxWidth: "400px" }}
      >
        {error && (
          <div
            className="alert alert-danger p-2 mb-0 d-flex align-items-center animate__animated animate__fadeInDown"
            role="alert"
            style={{ animationDuration: "0.5s" }}
          >
            <div>{error}</div>
          </div>
        )}
        {/* ID Number Input */}
        <div className="mb-4">
          <label htmlFor="idNumber" className="form-label">
            Username
          </label>
          <MDBInput
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
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <MDBInput
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
              top: "78%",
              right: "10px",
              cursor: "pointer",
              transform: "translateY(-50%)",
              color: "#007bff",
            }}
          >
            {showPassword ? (
              <FaEye color="#191970" />
            ) : (
              <FaEyeSlash color="#191970" />
            )}
          </span>
        </div>

        {/* Forgot Password */}
        <div className="text-end">
          <a href="#!" className="small" style={{ color: "#191970" }}>
            Forgot Password?
          </a>
        </div>

        {/* Login Button */}
        <div className="d-grid gap-2">
          <button className="login-btn" type="submit" data-mdb-ripple-init>
            {isLoading ? <SpinnerLoaderV2 /> : "Login"}
          </button>
        </div>
      </form>
    </MDBContainer>
  );
}
