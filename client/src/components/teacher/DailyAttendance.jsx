/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import { Button, Table, Flex, Input, Skeleton } from "antd";
import {
  CameraOutlined,
  IdcardOutlined,
  SearchOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import UploadClassPicture from "./UploadClassPicture";

const DailyAttendance = ({ handleManualAttendance, sortedData, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const items = sortedData.map((Item) => ({
    key: Item.id,
    studentId: Item.idNumber,
    name: Item.name,
    action: (
      <>
        <Button
          onClick={() => handleManualAttendance(Item.idNumber)}
          className={`button ${Item.status === "Absent" ? "absent" : ""}`}
          id="statusButton"
          style={{ color: "white" }}
        >
          {Item.status}
        </Button>
      </>
    ),
  }));

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
      title: (
        <>
          <Flex gap={6} justify="center">
            <SettingOutlined />
            <span>Action</span>
          </Flex>
        </>
      ),
      dataIndex: "action",
      key: "action",
    },
  ];

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      // Column configuration not to be checked
      name: record.name,
    }),
  };

  // USE THUS FOR WHEN USER DISABLES
  // getCheckboxProps: (record) => ({
  //     disabled: record.name === "Disabled User",
  //     // Column configuration not to be checked
  //     name: record.name,
  //   }),
  // };

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton active />
        </>
      ) : (
        <>
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

            <Flex gap={10}>
              <Button type="primary">
                <CameraOutlined className="fs-5" />
              </Button>
              <UploadClassPicture
              // date={formattedDate}
              // subjectAndCode={
              //   currentClass.subject + " " + currentClass.classCode
              // }
              // schedule={currentClass.schedule}
              ></UploadClassPicture>
            </Flex>
          </Flex>
          <Table
            className="rounded"
            dataSource={items}
            columns={columns}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
          />
        </>
      )}
    </>
  );
};

export default DailyAttendance;
