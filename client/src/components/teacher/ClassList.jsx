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
  Divider,
  Flex,
  Typography,
  Row,
  Col,
  Card,
  Input,
  Modal,
} from "antd";
const { Search } = Input;
import { Link } from "react-router-dom";
import { EyeOutlined, PlusOutlined } from "@ant-design/icons";

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
  const [openMenu, setOpenMenu] = useState(null); // Track which menu is open
  const [searchQuery, setSearchQuery] = useState(""); // State for search query
  const [showEditClass, setShowEditClass] = useState(false); // Manage EditClass modal

  useEffect(() => {
    getClasses();
  }, [getClasses]);

  const handleShowCreateClass = () => {
    setShowCreateClass(true);
  };

  const handleBackButtonClick = () => {
    setShowCreateClass(false);
  };

  const toggleMenu = (classCode) => {
    setOpenMenu((prev) => (prev === classCode ? null : classCode));
  };

  const handleEditClick = (cls) => {
    setSelectedClass(cls); // Set the selected class for editing
    setShowEditClass(true); // Open the edit modal
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
        await archiveClass(selectedClass);
        setNotificationMessage("Class archived successfully!");
        setNotificationType("success");
      } else if (selectedAction === "delete") {
        await deleteClass(selectedClass);
        setNotificationMessage("Class deleted successfully!");
        setNotificationType("success");
      }
      await getClasses(); // Refresh the classes
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
    <Flex vertical style={{ margin: 10 }} gap={23}>
      <Flex
        justify="space-between"
        gap={23}
        align="center"
        style={{
          // margin: "30px 30px 0",
          padding: 24,
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
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
          {!showCreateClass && (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleShowCreateClass}
            >
              Add Classs
            </Button>
          )}
          {showCreateClass && (
            <CreateClass
              goBack={handleBackButtonClick}
              onSuccess={async () => {
                await getClasses(); // Refresh classes after successful creation
                setNotificationMessage("Class is created successfully!");
                setNotificationType("success");
                window.location.reload();
              }}
            />
          )}
        </Flex>
      </Flex>

      {!showCreateClass && (
        <>
          <Flex
            vertical
            style={{
              padding: 24,
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0px 2px 2px 0px rgba(0, 0, 0, 0.1)",

              width: "100%",
            }}
          >
            <Row
              gutter={[24, 24]}
              wrap
              style={{ display: "flex", flexWrap: "wrap" }}
            >
              {filteredClasses.map((cls) => (
                <Col
                  key={cls.classCode}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={8}
                  xl={6}
                  style={{
                    flex: "1 1 450px",
                    minWidth: "450px",
                    maxWidth: "500px",
                    padding: "12px",
                  }}
                >
                  <Card
                    title={
                      <Flex
                        justify="start"
                        align="center"
                        style={{ gap: "10px", padding: "0 10px" }}
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
                                  handleActionClick("archive", cls.classCode)
                                }
                              >
                                Archive
                              </button>
                              <button
                                onClick={() =>
                                  handleActionClick("delete", cls.classCode)
                                }
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Class Title */}
                        <Typography.Title
                          level={4}
                          strong
                          style={{ margin: 0, display: "block" }}
                        >
                          {cls.subject}
                        </Typography.Title>
                      </Flex>
                    }
                    style={{
                      minWidth: 450,
                      maxWidth: 500,
                      boxShadow: "0px 1px 4px 0px rgba(0, 0, 0, 0.1)",

                      padding: "10px",
                    }}
                  >
                    <Flex
                      vertical
                      key={cls.classCode}
                      style={{ position: "relative" }}
                    >
                      <div className="class-info">
                        <p>
                          <strong>Class Code:</strong> {cls.classCode}
                        </p>
                        <p>
                          <strong>Room:</strong> {cls.room}
                        </p>
                        <p>
                          <strong>Academic Year:</strong> {cls.academicYear}
                        </p>
                        <p>
                          <strong>Term:</strong> {cls.term}
                        </p>
                        <p>
                          <strong>Schedule:</strong> {cls.days.join(", ")}{" "}
                          {cls.startTime} - {cls.endTime}
                        </p>
                      </div>
                      <Flex justify="space-between">
                        <Link to={`/teacher/attendance/${cls.classCode}`}>
                          <Button type="primary" icon={<EyeOutlined />}>
                            View Class
                          </Button>
                        </Link>
                      </Flex>
                    </Flex>
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

            {/* Edit Class Modal */}
            <Modal
              title="Edit Class"
              visible={showEditClass}
              onCancel={() => setShowEditClass(false)}
              footer={null} // No default footer
            >
              <EditClass
                existingClass={selectedClass} // Pass the selected class to edit
                onSuccess={async () => {
                  await getClasses(); // Refresh classes after successful editing
                  setNotificationMessage("Class edited successfully!");
                  setNotificationType("success");
                  setShowEditClass(false); // Close the modal after success
                }}
              />
            </Modal>
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ClassList;
