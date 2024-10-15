import React, { useEffect, useState } from "react";
import "../css/style.css";
import { FaArchive, FaTrash } from "react-icons/fa";
import Confirmation from "./Confirmation";
import CreateClass from "./CreateClass";
import Notification from "./Notification"; // Import the notification component
import { useClassStore } from "../../stores/classStore";
import { Button, Flex } from "antd";
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
    <div className="class-list-container">
      {!showCreateClass && (
        <>
          <div className="heading-container">
            <h1>All Classes</h1>
            <p>Here are the list of the classes you handle</p>
          </div>
        </>
      )}
      <div className="menu-create-btn-container">
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
              window.alert("Class is created successfully! Refreshing page.")
              window.location.reload();
            }}
          />
        )}
      </div>
      {!showCreateClass && (
        <>
          {isLoading ? (
            <p>Loading classes...</p>
          ) : error ? (
            <p>Error fetching classes: {error.message}</p>
          ) : Object.keys(groupedClasses).length > 0 ? (
            <div className="grouped-classes-container">
              {Object.keys(groupedClasses).map((subject) => (
                <div key={subject} className="subject-section">
                  <h2 className="subject-heading">{subject}</h2>
                  <div className="class-cards-container">
                    {groupedClasses[subject].map((cls) => (
                      <div key={cls.classCode} className="class-card">
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
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No classes available.</p>
          )}

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
        </>
      )}{" "}
    </div>
  );
};

export default ClassList;
