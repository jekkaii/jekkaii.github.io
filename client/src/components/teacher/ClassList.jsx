/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "../css/style.css";
import { FaArchive, FaTrash } from "react-icons/fa";
import Confirmation from "./Confirmation";
import CreateClass from "./CreateClass";
import Notification from "./Notification"; // Import the notification component
import { useClassStore } from "../../stores/classStore";
import { Button, Divider, Flex, Typography, Row, Col, Card } from "antd";
import { Link } from "react-router-dom";
import { DownOutlined, EyeOutlined, PlusOutlined } from "@ant-design/icons";

const ClassList = () => {
  const { getClasses, classes, isLoading, error, deleteClass, archiveClass } =
    useClassStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedAction, setSelectedAction] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [showCreateClass, setShowCreateClass] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState(""); // 'success' or 'error'

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  const handleShowCreateClass = () => {
    setShowCreateClass(true);
  };

  const handleBackButtonClick = () => {
    setShowCreateClass(false);
  };

  const handleActionClick = (action, classCode) => {
    setSelectedAction(action);
    setSelectedClass(classCode);
    setModalMessage(
      action === "archive"
        ? `Are you sure you want to archive the class with code ${classCode}?`
        : `Are you sure you want to delete the class with code ${classCode}?`
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
      if (selectedAction === "archive") {
        await archiveClass(selectedClass); // Call the archiveClass function
        setNotificationMessage("Class archived successfully!"); // Set success message
        setNotificationType("success");
      } else if (selectedAction === "delete") {
        await deleteClass(selectedClass); // Call the deleteClass function
        setNotificationMessage("Class deleted successfully!"); // Set success message
        setNotificationType("success");
      }
      await getClasses(); // Refresh the classes after action
    } catch (error) {
      console.error("Error performing action on class:", error);
      setNotificationMessage("An error occurred. Please try again."); // Set error message
      setNotificationType("error");
    }
    closeModal(); // Close the modal
  };

  // Group classes by subject
  const groupedClasses = classes.reduce((acc, cls) => {
    const subject = cls.subject;
    if (!acc[subject]) {
      acc[subject] = [];
    }
    acc[subject].push(cls);
    return acc;
  }, {});

  return (
    <Flex vertical style={{ margin: 10 }}>
      <Flex justify="space-between" align="center">
        {!showCreateClass && (
          <Flex vertical>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              Class List
            </Typography.Title>
            <Typography.Text>
              Here are the list of the classes you handle
            </Typography.Text>
          </Flex>
        )}
        <Flex>
          {!showCreateClass && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleShowCreateClass}
            ></Button>
          )}
          {showCreateClass && (
            <CreateClass
              goBack={handleBackButtonClick}
              onSuccess={() => {
                window.alert("Class is created successfully! Refreshing page.");
                window.location.reload();
              }}
            />
          )}
        </Flex>
      </Flex>
      <Divider />

      {!showCreateClass && (
        <Flex>
          <Row
            gutter={[24, 24]}
            wrap={true}
            style={{
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(groupedClasses).map((subject) => (
              <Col
                key={subject}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                xl={6}
                style={{
                  flex: "1 1 450px",
                  minWidth: "450px", // Minimum width of each card
                  maxWidth: "500px", // Maximum width of each card
                  padding: "12px",
                }}
              >
                <Card
                  title={
                    <Typography.Title level={4} strong>
                      {subject}
                    </Typography.Title>
                  }
                  style={{
                    minWidth: 450,
                    maxWidth: 500,
                    boxShadow: "0px 2px 5px 0px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {groupedClasses[subject].map((cls) => (
                    <Flex vertical key={cls.classCode}>
                      <div className="class-info">
                        <p>Class Code: {cls.classCode}</p>
                        <p>Room: {cls.room}</p>
                        <p>Academic Year: {cls.academicYear}</p>
                        <p>Term: {cls.term}</p>
                        <p>
                          Schedule: {cls.days.join(", ")} {cls.startTime} -{" "}
                          {cls.endTime}
                        </p>
                      </div>
                      <Flex justify="space-between">
                        <Link to={`/teacher/attendance/${cls.classCode}`}>
                          <Button type="primary" icon={<EyeOutlined />}>
                            View Class
                          </Button>
                        </Link>
                        <Flex>
                          <Button
                            type="text"
                            icon={<FaArchive />}
                            onClick={() =>
                              handleActionClick("archive", cls.classCode)
                            }
                          />
                          <Button
                            type="text"
                            icon={<FaTrash />}
                            onClick={() =>
                              handleActionClick("delete", cls.classCode)
                            }
                          />
                        </Flex>
                      </Flex>
                    </Flex>
                  ))}
                </Card>
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
        </Flex>
      )}
    </Flex>
  );
};

export default ClassList;
