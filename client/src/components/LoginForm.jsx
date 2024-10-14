import { useState } from "react";
import { Link } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import { useAuthStore } from "../stores/authStore";
import facelogo from "../components/resources/face.png"; // Update the path to your logo image
import "../components/css/style.css"; // Import the CSS file
import SpinnerLoaderV2 from "../components/LoginSipinner";
import { Button, ConfigProvider, Input, Form, Flex, Alert } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import google from "../components/resources/google.png";

export default function LoginForm() {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");

  // Initialize authStore
  const { login } = useAuthStore();
  const { isLoggingIn, error, isLoading } = useAuthStore();

  const handleLogin = async () => {
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
        {/* Logo */}
        <div className="d-flex w-100 mb-4" style={{ maxWidth: "400px" }}>
          <img src={facelogo} alt="University Logo" className="img-fluid" />
        </div>

        {/* Login header */}
        <div
          className="d-flex w-100 text-center row mb-4"
          style={{ maxWidth: "400px" }}
        >
          <h1 className="p-0">Welcome Back!</h1>
          <h6 className="p-0" style={{ color: "gray" }}>
            Login with your credentials
          </h6>
        </div>

        {/* Login form */}
        <Form
          layout="vertical"
          onFinish={handleLogin}
          className="w-100"
          style={{ maxWidth: "400px" }}
          name="login"
          initialValues={{
            remember: true,
          }}
        >
          {error && !isLoading && (
            <Alert className="mb-4" message={error} type="error" showIcon />
          )}

          {/* Username input */}

          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              onChange={(e) => setIdNumber(e.target.value)}
              prefix={<UserOutlined style={{ color: "#2a1f7e" }} />}
              size="large"
            />
          </Form.Item>
          {/* Password input */}
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              className=""
              prefix={<LockOutlined style={{ color: "#2a1f7e" }} />}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              size="large"
              security="true"
            />
          </Form.Item>

          {/* Forgot password link */}
          <Flex justify="end" align="center" className="mb-4">
            <Link to="#" className="text-decoration-none fw-bold">
              Forgot Password?
            </Link>
          </Flex>

          {/* Login button */}
          <Form.Item className="mb-5">
            <Button block type="primary" htmlType="submit" size="large">
              {isLoggingIn ? <SpinnerLoaderV2 /> : "Login"}
            </Button>
          </Form.Item>

          {/* Terms of Service and Privacy Policy links */}
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

          {/* Sign in with Google button */}
          <hr className="mb-5" />
          <div className="d-grid gap-2 mb-5">
            <Button color="primary" variant="outlined" size="large">
              <img src={google} alt="google-logo" width="25" />
              Sign in with Google
            </Button>
          </div>
        </Form>
      </MDBContainer>
    </ConfigProvider>
  );
}
