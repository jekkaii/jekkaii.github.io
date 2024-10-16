import { useState } from "react";
import { Link } from "react-router-dom";
import { MDBContainer } from "mdb-react-ui-kit";
import { useAuthStore } from "../stores/authStore";
import facelogo from "../components/resources/face.png"; // Update the path to your logo image
import "../components/css/style.css"; // Import the CSS file
import loginpreloader from "../components/resources/preloader-logov3.svg";
import {
  Button,
  ConfigProvider,
  Input,
  Form,
  Flex,
  Alert,
  Typography,
} from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import google from "../components/resources/google.png";

export default function LoginForm() {
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState("");

  // Initialize authStore
  const { login } = useAuthStore();
  const { isLoggingIn, error } = useAuthStore();

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
      <Flex
        vertical
        justify="space-between"
        align="center"
        style={{
          margin: "70px 30px",
          // borderRadius: "20px",
          // boxShadow:
          //   "0px 4px 24px 0px rgba(0, 0, 0, 0.1), 0px 0px 1px 0px rgba(0, 0, 0, 0.01), 0px 4px 5px -3px rgba(0, 0, 0, 0.3)",
          // width: "500px",
        }}
      >
        {/* Logo */}
        <div className="d-flex w-100 mb-4 mt-5" style={{ maxWidth: "400px" }}>
          <img src={facelogo} alt="University Logo" className="img-fluid" />
        </div>

        {/* Login header */}
        <div
          className="d-flex w-100 text-center row mb-3"
          style={{ maxWidth: "400px" }}
        >
          <Typography.Title level={1} className=" m-0">
            Welcome Back!
          </Typography.Title>
          <Typography.Text
            className=" fw-normal fs-6"
            style={{ color: "gray" }}
          >
            Login with your credentials
          </Typography.Text>
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
          {error && !isLoggingIn && (
            <Alert className="mb-3" message={error} type="error" showIcon />
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
            style={{ marginBottom: "10px" }}
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
          <Form.Item className="mb-3">
            <Button block type="primary" htmlType="submit" size="large">
              {isLoggingIn ? (
                <img src={loginpreloader} alt="preloader-logo" width="25" />
              ) : (
                "Login"
              )}
            </Button>
          </Form.Item>

          {/* Terms of Service and Privacy Policy links */}
          <div className="text-center mb-5">
            <h6>
              By signing in, you agree to our
              <Link className="text-decoration-none ms-1 fw-bold" to="#">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link className="text-decoration-none ms-1 fw-bold" to="#">
                Privacy Policy
              </Link>
            </h6>
          </div>

          {/* Sign in with Google button */}
          <hr className="signinwith mb-5" />
          <div className="d-grid gap-2 mb-5">
            <Button color="primary" variant="outlined" size="large">
              <img src={google} alt="google-logo" width="25" />
              Sign in with Google
            </Button>
          </div>
        </Form>
      </Flex>
    </ConfigProvider>
  );
}
