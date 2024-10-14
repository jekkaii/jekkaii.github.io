import { useState } from "react";
import { Link } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import { useAuthStore } from "../stores/authStore";
import facelogo from "../components/resources/face.png"; // Update the path to your logo image
import "../components/css/style.css"; // Import the CSS file
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import SpinnerLoaderV2 from "../components/LoginSipinner";
import { Button, ConfigProvider, Input } from "antd";
import { LockFilled, UserOutlined } from "@ant-design/icons";
import google from "../components/resources/google.png";

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
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2a1f7e",
        },
      }}
    >
      <MDBContainer className="container-fluid d-flex flex-column justify-content-center align-items-center vh-100 no-shadow">
        <div className="d-flex w-100 mb-4" style={{ maxWidth: "400px" }}>
          <img src={facelogo} alt="University Logo" className="img-fluid" />
        </div>
        <div
          className="d-flex w-100 text-center row mb-2"
          style={{ maxWidth: "400px" }}
        >
          <h1 className="p-0">Welcome Back!</h1>
          <h6 className="p-0" style={{ color: "gray" }}>
            Login with your credentials
          </h6>
        </div>

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
          <div className="flex col mb-4">
            <div className="position-relative">
              <label htmlFor="idNumber" className="form-label">
                Username<span className="text-danger"> *</span>
              </label>
              <Input
                onChange={(e) => setIdNumber(e.target.value)}
                id="idNumber"
                size="large"
                value={idNumber}
                prefix={<UserOutlined style={{ color: "#2a1f7e" }} />}
              />
            </div>
            {/* Password Input with Toggle */}
            <div className="position-relative">
              <label htmlFor="password" className="form-label">
                Password<span className="text-danger"> *</span>
              </label>
              <Input
                onChange={(e) => setPassword(e.target.value)}
                size="large"
                id="password"
                prefix={<LockFilled style={{ color: "#2a1f7e" }} />}
                type={showPassword ? "text" : "password"}
                value={password}
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
          </div>

          {/* Forgot Password */}
          <div className="mb-4">
            <Link to="#" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          {/* Login Button */}
          <div className="d-grid gap-2 mb-5">
            <Button type="primary" htmlType="submit" size="large">
              {isLoading ? <SpinnerLoaderV2 /> : "Login"}
            </Button>
          </div>

          <div className="text-center mb-5">
            <p>
              By signing in, you agree to our
              <Link className="text-decoration-none ms-1 fw-bold" to="#">
                {" "}
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link className="text-decoration-none ms-1 fw-bold" to="#">
                Privacy Policy
              </Link>
            </p>
          </div>

          <hr className="mb-5" />
          <div className="d-grid gap-2 mb-5">
            <Button color="primary" variant="outlined" size="large">
              <img src={google} alt="google-logo" width="25" />
              Sign in with Google
            </Button>
          </div>
        </form>
      </MDBContainer>
    </ConfigProvider>
  );
}
