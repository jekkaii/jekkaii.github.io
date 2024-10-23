/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../css/style.css";
import { FaEllipsisV } from "react-icons/fa"; // Hamburger Icon
import Confirmation from "./Confirmation";
import CreateClass from "./CreateClass";
import Notification from "./Notification";
import EditClass from "./EditClass";
import { useClassStore } from "../../stores/classStore";
import {
  Button,
  Skeleton,
  Flex,
  Typography,
  Row,
  Col,
  Card,
  Input,
  Empty,
} from "antd";
const { Search } = Input;
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons";

const ClassList = () => {
  const { readClasses, classes, isLoading, error, deleteClass } =
    useClassStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState(""); // 'success' or 'error'
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showEditClass, setShowEditClass] = useState(false); // Manage EditClass modal

  useEffect(() => {
    readClasses();
  }, [readClasses]);

  const toggleMenu = (classCode) => {
    setOpenMenu((prev) => (prev === classCode ? null : classCode));
  };

  const handleEditClick = (cls) => {
    setSelectedClass(cls); // Set the selected class for editing
    setShowEditClass(true); // Open the edit modal
  };

  const handleActionClick = (classCode) => {
    setSelectedClass(classCode);
    setModalMessage(
      <>
        Are you sure you want to delete class <strong>{classCode}</strong>?
      </>
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalMessage("");
  };

  const closeNotification = () => {
    setNotificationMessage("");
    setNotificationType("");
  };

  const confirmAction = async () => {
    try {
      await deleteClass(selectedClass);
      setIsModalOpen(false);
      setModalMessage("");
      setNotificationMessage("Class deleted successfully!");
      setNotificationType("success");
      window.location.reload();
    } catch (error) {
      console.error("Error performing action on class:", error);
      setNotificationMessage("An error occurred. Please try again.");
      setNotificationType("error");
    }
    closeModal();
  };

  // Filter classes based on search query
  const filteredClasses = classes.filter(
    (cls) =>
      cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cls.classCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Flex vertical gap={23}>
      <Card
        style={{
          boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.05)",
          width: "100%",
          border: "none",
        }}
      >
        <Flex justify="space-between" gap={23} align="center">
          <Flex vertical>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              Class List
            </Typography.Title>
            <Typography.Text>
              Here are the list of the classes you handle
            </Typography.Text>
          </Flex>
          <Flex gap={23}>
            {/* Search Input in the Middle */}
            <Search
              placeholder="input search text"
              onSearch
              enterButton
              value={searchQuery}
              style={{ width: 500 }}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <CreateClass
              onSuccess={() => {
                setNotificationMessage("Class created successfully!");
                setNotificationType("success");
                // setTimeout(() => {
                window.location.reload();
                // }, 2000); // Reload the page after 2 seconds
              }}
            />
          </Flex>
        </Flex>
      </Card>

      <>
        {classes.length === 0 && (
          <Flex justify="center" align="center">
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Flex>
        )}
        {classes.length > 0 && (
          <Flex
            style={{
              borderRadius: "10px",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <Row
              gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
              wrap
              justify={"start"}
              style={{
                width: "100%",
                display: "flex",
              }}
            >
              {filteredClasses.map((cls) => (
                <Col
                  key={cls.classCode}
                  className="gutter-row"
                  span={6}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minWidth: "530px",
                    padding: "10px",
                  }}
                >
                  {isLoading ? (
                    <Skeleton.Node active style={{ width: 200 }} />
                  ) : (
                    <Card
                      bordered={true}
                      title={
                        <Flex
                          justify="space-between"
                          align="center"
                          style={{
                            gap: "10px",
                            padding: "0 10px",
                            border: "none",
                          }}
                        >
                          {/* Hamburger Icon */}
                          <div className="hamburger-menu">
                            <FaEllipsisV
                              className="hamburger-icon"
                              onClick={() => toggleMenu(cls.classCode)}
                              style={{
                                cursor: "pointer",
                                fontSize: "16px",
                                paddingRight: "10px",
                              }} // Adjust icon size if needed
                            />
                            {openMenu === cls.classCode && (
                              <div className="menu-options">
                                <button onClick={() => handleEditClick(cls)}>
                                  Edit
                                </button>
                                <button
                                  onClick={() =>
                                    handleActionClick(cls.classCode)
                                  }
                                >
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>

                          {/* Class Title */}
                          <Typography.Title level={3} strong>
                            {cls.subject}
                          </Typography.Title>
                        </Flex>
                      }
                      style={{
                        boxShadow: "0px 0px 5px rgba(0, 0, 0, 0.05)",

                        padding: "10px",
                        width: "100%",
                      }}
                    >
                      <Flex
                        vertical
                        key={cls.classCode}
                        style={{ position: "relative" }}
                      >
                        <div className="class-info">
                          <Typography.Title level={4}>
                            <strong>Class Code:</strong> {cls.classCode}
                          </Typography.Title>
                          <Typography.Title className="m-1" level={5}>
                            <strong>Room:</strong> {cls.room}
                          </Typography.Title>
                          <Typography.Title className="m-1" level={5}>
                            <strong>Academic Year:</strong> {cls.academicYear}
                          </Typography.Title>
                          <Typography.Title className="m-1" level={5}>
                            <strong>Term:</strong> {cls.term}
                          </Typography.Title>
                          <Typography.Title className="m-1 mb-3" level={5}>
                            <strong>Schedule:</strong> {cls.days.join(", ")}{" "}
                            {cls.startTime} - {cls.endTime}
                          </Typography.Title>
                        </div>
                        <Flex>
                          <Link to={`/teacher/attendance/${cls.classCode}`}>
                            <Button type="primary" icon={<EyeOutlined />}>
                              View Class
                            </Button>
                          </Link>
                        </Flex>
                      </Flex>
                    </Card>
                  )}
                </Col>
              ))}
            </Row>

            <Confirmation
              isOpen={isModalOpen}
              onClose={closeModal}
              onConfirm={confirmAction}
              message={modalMessage}
            />

            {notificationMessage && (
              <Notification
                message={notificationMessage}
                type={notificationType}
                onClose={closeNotification}
              />
            )}

            {/* Edit Class Modal */}
            <EditClass
              existingClass={selectedClass} // Pass the selected class to edit
              open={showEditClass}
              close={() => setShowEditClass(false)}
              selectedClass={selectedClass}
              onSuccess={() => {
                setNotificationMessage("Class updated successfully!");
                setNotificationType("success");
                window.location.reload();
              }}
            />
          </Flex>
        )}
      </>
    </Flex>
  );
};

export default ClassList;
