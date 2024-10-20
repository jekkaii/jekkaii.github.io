/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { act, useState } from "react";
import "../css/style.css";
import Confirmation from "./Confirmation";
import { Flex, Table, Button, Input, Dropdown } from "antd";
import {
  IdcardOutlined,
  SearchOutlined,
  TagOutlined,
  MoreOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import AddStudent from "./AddStudent";
import Notification from "./Notification";

const ManageStudents = ({ sortedData, classCode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectValue, setSelectValue] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState(""); // 'success' or 'error'


  // State to track selected row keys
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // const props = {
  //   name: "file",
  //   action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  //   headers: {
  //     authorization: "authorization-text",
  //   },
  //   onChange(info) {
  //     if (info.file.status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (info.file.status === "done") {
  //       message.success(`${info.file.name} file uploaded successfully`);
  //     } else if (info.file.status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  // };

  // Dropdown menu
  const actionMenu = [
    {
      key: "1",
      label: "Edit",
    },
    {
      key: "2",
      label: "Delete",
    },
  ];

  // Student data and buttons
  const items = sortedData.map((Item) => ({
    key: Item.id,
    studentId: Item.idNumber,
    name: Item.name,
    createdAt: Item.createdAt,
    updatedAt: (
      <Flex justify="space-between">
        <span>{Item.updatedAt}</span>
        <Dropdown
          menu={{
            items: actionMenu,
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <MoreOutlined className="fs-5" />
          </a>
        </Dropdown>
      </Flex>
    ),
  }));

  // Table columns
  const columns = [
    {
      title: (
        <>
          <Flex gap={6}>
            <IdcardOutlined />
            <span>ID Number</span>
          </Flex>
        </>
      ),
      dataIndex: "studentId",
      key: "studentId",
      filteredValue: [searchTerm],
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
      onFilter: (value, record) => {
        return (
          String(record.studentId)
            .toLowerCase()
            .includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
    },
    {
      title: (
        <>
          <Flex gap={6}>
            <TagOutlined />
            <span>Name</span>
          </Flex>
        </>
      ),
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Date Created",
      dataIndex: "createdAt",
      key: "createdAt",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Date Updated",
      dataIndex: "updatedAt",
      key: "updatedAt",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
  ];

  // Check if all students are selected
  const isAllSelected =
    sortedData.length > 0 && selectValue.length === sortedData.length;

  // Handle individual checkbox and select all
  const handleCheck = (id) => {
    if (id === "all") {
      if (isAllSelected) {
        setSelectValue([]);
      } else {
        setSelectValue(sortedData.map((student) => student.idNumber));
      }
    } else {
      if (selectValue.includes(id)) {
        setSelectValue(selectValue.filter((studentId) => studentId !== id));
      } else {
        setSelectValue([...selectValue, id]);
      }
    }
  };

  const handleEditStudent = () => {
    // // add here code for edit student
    // handleClose();
  };
  // add here code for delete student

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    console.log("File uploaded:", file);
  };

  // Handle delete modal confirmation
  const handleDeleteStudentConfirmation = (data) => {
    if (isAllSelected) {
      setModalMessage(
        "Are you sure you want to delete all students from this class?"
      );
    } else {
      const selectedNames = data
        .filter((student) => selectValue.includes(student.idNumber))
        .map((student, index) => (
          <React.Fragment key={student.idNumber}>
            {index + 1}. {student.name} <br />
          </React.Fragment>
        ));
      setModalMessage(
        <React.Fragment>
          Are you sure you want to delete the following student/s from the
          class?
          <br />
          {selectedNames}
        </React.Fragment>
      );
    }
    setIsModalOpen(true);
  };

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User", // Disable checkbox for a particular row
      name: record.name,
    }),
  };

  return (
    <>
      {/* Search, Add, Delete and File Upload buttons */}
      <Flex gap={10} justify="space-between">
        <Input
          placeholder="Input ID Number or Name"
          allowClear
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            maxWidth: 450,
          }}
        />

        <Flex>
          {/* <Upload {...props} on>
            <Button>
              <UploadOutlined className="fs-4" />
            </Button>
            
          {/* </Upload> */}

          <Flex gap={10}>
            {/* <Button type="primary" size="medium">
              <PlusOutlined className="fs-7" />
              Add Student
            </Button>
             */}
            <AddStudent 
              onSuccess={() => {
                setNotificationMessage("Student added successfully!");
                setNotificationType("success");
                window.location.reload();
              }}
              classCode={classCode}
            >

            </AddStudent>
            <Button
              className="m-0 pt-0"
              size="medium"
              variant="solid"
              color="danger"
              style={{
                display: selectedRowKeys.length === 0 ? "none" : "block",
                transition: "display 0.3s ease-in-out",
              }}
            >
              <DeleteOutlined />
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* Confirmation Modal */}
      <Confirmation
        isOpen={isModalOpen}
        // onClose={closeModal}
        message={modalMessage}
      />

      {/* Students Table */}
      <Table
        className="rounded"
        dataSource={items}
        columns={columns}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
      />

      
      {notificationMessage && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={closeNotification}
        />
      )}
    </>
  );
};

export default ManageStudents;
