/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from "react";
import "./css/style.css";
import {
  Flex,
  Form,
  Input,
  Button,
  Menu,
  Typography,
  Divider,
  Row,
  Col,
  Select,
  message,
  Upload,
  Avatar,
} from "antd";
import {
  EditOutlined,
  LockOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAdminStore } from "../stores/adminStore";
import defaultPhoto from "./resources/default.png";
import ImgCrop from "antd-img-crop";

const Profile = ({ user, isAdmin }) => {
  const userData = user;
  const formRef = useRef(null);
  const [userPhoto, setUserPhoto] = useState(null); // Store the photo file
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [saveLoading, setSaveLoading] = useState(false);
  const [wrongFileType, setWrongFileType] = useState(false);
  const [wrongSize, setWrongSize] = useState(false);
  const [fileList, setFileList] = useState([]); // Track uploaded files

  const { editUser, success, error } = useAdminStore((state) => ({
    editUser: state.editUser,
    success: state.success,
    error: state.error,
    message: state.message,
  }));

  useEffect(() => {
    if (success) {
      formRef.current.resetFields();
      setUserPhoto(null);
      setButtonDisabled(true);
    }
  }, [success, error]);

  useEffect(() => {
    if (userPhoto) {
      setButtonDisabled(false);
    }
  }, [userPhoto]);

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isSizeValid = file.size >= 80 * 1024 && file.size <= 2000 * 1024;

    if (!isJpgOrPng) {
      setWrongFileType(true);
      return false;
    }

    if (!isSizeValid) {
      setWrongSize(true);
      return false;
    }

    setUserPhoto(file);
    setWrongSize(false);
    setWrongFileType(false);
    setButtonDisabled(false);
    return false; // Prevent automatic upload
  };

  // Handle file changes and update fileList state
  const handleUploadChange = ({ file }) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    const isSizeValid = file.size >= 80 * 1024 && file.size <= 2000 * 1024;

    if (!isJpgOrPng) {
      setWrongSize(false);
      setFileList([]); // Clear file list if wrong file type
      setButtonDisabled(true); // Disable save button
      return;
    }

    if (!isSizeValid) {
      setWrongFileType(false);
      setFileList([]); // Clear file list if wrong size
      setButtonDisabled(true); // Disable save button
      return;
    }

    // If both type and size are valid, update the file list
    setFileList([file]); // Set the file list with the valid file
    setButtonDisabled(false); // Enable the button since the file is valid
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append("photo", file);

    try {
      setSaveLoading(true);
      await editUser(formData, user.username); // Make sure your editUser handles file uploads
      onSuccess(file); // Call onSuccess to indicate that the upload was successful
      window.location.reload();
    } catch (err) {
      onError(err); // Call onError to indicate that there was an error
    }
  };
  const onFinish = async (values) => {
    const formData = new FormData();

    // Append all form values to formData
    for (const key in values) {
      formData.append(key, values[key]);
    }

    // Check if a photo was uploaded, and append the raw file object to formData
    if (userPhoto) {
      formData.append("photo", userPhoto); // Append the raw file
    }

    setButtonDisabled(true);
    setSaveLoading(true);

    try {
      await editUser(formData, user.username); // Call editUser with the form data
      formRef.current.resetFields(); // Reset the form
      setUserPhoto(null); // Reset photo state
      window.location.reload();
    } catch (err) {
      message.error("Failed to update user.");
    } finally {
      setSaveLoading(false);
    }
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const items = [
    {
      key: "grp1",
      type: "group",
      label: (
        <Typography.Text style={{ margin: 0, padding: 0, color: "gray" }}>
          Settings
        </Typography.Text>
      ),
      children: [
        {
          key: "1",
          icon: <UserOutlined />,
          label: (
            <Link className="text-decoration-none m-0" to="/profile">
              Basic Information
            </Link>
          ),
        },
        {
          key: "2",
          icon: <LockOutlined />,
          label: (
            <Link className="text-decoration-none m-0" to="/profile">
              Password
            </Link>
          ),
        },
      ],
    },
  ];

  return (
    <Flex vertical>
      <Flex
        vertical
        style={{
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.05)",
          maxWidth: "100%",
          marginBottom: "20px",
        }}
      >
        <Flex vertical style={{ padding: "20px" }} justify="center">
          <Typography.Title level={2} style={{ marginBottom: 3 }}>
            <SettingOutlined style={{ marginRight: "5px" }} />
            Account Settings
          </Typography.Title>
          <Typography.Text type="secondary">
            Here you can edit your basic information about yourself.
          </Typography.Text>
        </Flex>
        <Divider style={{ margin: 0 }} />
      </Flex>

      <Flex gap={20} style={{ minHeight: "600px" }}>
        <Form
          initialValues={{
            username: userData.username,
            firstname: userData.firstName,
            lastname: userData.lastName,
            email: userData.email,
            role: userData.role,
            department: userData.department,
          }}
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 100 }}
          style={{ width: "100%", flexGrow: 1 }}
          layout="vertical"
          name="edit-profile"
          onFinish={onFinish}
          onValuesChange={() => setButtonDisabled(false)} // Enable button based on file size validity
          validateMessages={validateMessages}
          colon={false}
          labelAlign="left"
          ref={formRef}
        >
          <Flex gap={20}>
            <Flex
              style={{
                padding: "20px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.05)",
                minWidth: "300px",
              }}
              vertical
              align="center"
            >
              <Flex vertical align="center" gap={19} style={{ margin: 0 }}>
                <Typography.Text className="fs-6">
                  Profile Picture
                </Typography.Text>
                <Avatar
                  size={180}
                  style={{ border: "2px solid #f0f0f0" }}
                  src={
                    user.photo
                      ? `http://localhost:3001/${user.photo}`
                      : defaultPhoto
                  }
                />
              </Flex>
              <br />
              <Form.Item>
                <ImgCrop rotationSlider>
                  <Upload
                    fileList={fileList}
                    beforeUpload={beforeUpload}
                    customRequest={customRequest}
                    showUploadList={true}
                    maxCount={1}
                    onChange={handleUploadChange}
                    onPreview={onPreview}
                    style={{ width: "100%" }}
                  >
                    <Button icon={<EditOutlined />}>
                      Edit Profile Picture
                    </Button>
                  </Upload>
                </ImgCrop>
              </Form.Item>
              {wrongFileType && (
                <Typography.Text className="text-center" type="danger">
                  You can only upload JPG/PNG file!
                </Typography.Text>
              )}
              {wrongSize && (
                <Typography.Text className="text-center" type="danger">
                  File size should be between 80KB and 2MB
                </Typography.Text>
              )}
              <Typography.Text type="secondary">
                Allowed file types: JPG/PNG
              </Typography.Text>
              <Typography.Text type="secondary">
                Allowed file size: 80KB - 2MB
              </Typography.Text>

              <Divider style={{ margin: "10px 0" }} />
              <Menu
                defaultSelectedKeys={["1"]}
                defaultOpenKeys={["sub1"]}
                items={items}
                style={{ width: "100%", border: "none" }}
              />
            </Flex>
            <Flex
              vertical
              style={{
                padding: "30px",
                backgroundColor: "#fff",
                borderRadius: "10px",
                boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.05)",
                width: "100%",
              }}
            >
              <Form.Item
                name="username"
                label="Username"
                tooltip="Username cannot be changed."
              >
                <Input disabled style={{ maxWidth: "200px" }} />
              </Form.Item>
              <Typography.Text className="mb-2">Name</Typography.Text>
              <Form.Item className="mb-2">
                <Row gutter={8}>
                  <Col>
                    <Form.Item
                      className="mb-2"
                      name="firstname"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Firstname" aria-label="Firstname" />
                    </Form.Item>
                  </Col>
                  <Col>
                    <Form.Item
                      noStyle
                      name="lastname"
                      rules={[{ required: true }]}
                    >
                      <Input placeholder="Lastname" aria-label="Lastname" />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item name="email" label="Email" rules={[{ type: "email" }]}>
                <Input style={{ maxWidth: "375px" }} />
              </Form.Item>
              <Form.Item name="role" label="Role" tooltip="Admin only">
                <Select style={{ maxWidth: "200px" }} disabled />
              </Form.Item>
              {!isAdmin && (
                <Form.Item name="department" label="Department">
                  <Input style={{ maxWidth: "200px" }} />
                </Form.Item>
              )}
              <Form.Item style={{ marginTop: "50px" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={buttonDisabled}
                  /******  64e05f4f-a4ae-4025-9953-ff25f2426a50  *******/
                  loading={saveLoading}
                >
                  Update Profile
                </Button>
                <Button
                  disabled={buttonDisabled}
                  type="default"
                  style={{
                    display: buttonDisabled ? "none" : undefined,
                    marginLeft: "10px",
                  }}
                  onClick={() => {
                    // Reset form fields to initial values
                    formRef.current?.resetFields();
                    setButtonDisabled(true);
                  }}
                >
                  Discard Changes
                </Button>
              </Form.Item>
            </Flex>
          </Flex>
        </Form>
      </Flex>
    </Flex>
  );
};

export default Profile;
