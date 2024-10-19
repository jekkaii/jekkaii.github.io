/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useCallback } from "react";
import { Button } from "react-bootstrap";
import { IoCaretDownCircle, IoCaretUpCircle } from "react-icons/io5";
import {
  CalendarOutlined,
  IdcardOutlined,
  SearchOutlined,
  SettingOutlined,
  TagOutlined,
} from "@ant-design/icons";
import { Table, Flex, Input, Skeleton } from "antd";

const AttendanceSummary = ({ sortedData, isLoading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const { isOpen, toggle } = useOpenController(false);

  const items = sortedData.map((Item) => ({
    key: Item.id,
    studentId: Item.idNumber,
    name: Item.name,
    absencesDates: Item.absencesDates,
    action: (
      <>
        <ExpandableButton
          isOpen={isOpen[Item.idNumber]}
          toggle={() => toggle(Item.idNumber)}
          absencesDates={Item.absencesDates}
        />
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
        <Flex gap={6}>
          <CalendarOutlined />
          <span>Absences</span>
        </Flex>
      ),
      dataIndex: "absencesDates",
      key: "absencesDates",
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

  return (
    <>
      {isLoading && (
        <>
          <Skeleton active />
        </>
      )}
      <Input
        placeholder="Input ID Number or Name"
        allowClear
        prefix={<SearchOutlined />}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          minWidth: 200,
        }}
      />
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
  );
};

// Custom Hook for controlling open/close state
const useOpenController = (initialState = false) => {
  const [isOpen, setOpenState] = useState(initialState);

  const toggle = useCallback(() => {
    setOpenState((state) => !state);
  }, []);

  return { isOpen, toggle };
};

// ExpandableButton component
const ExpandableButton = ({ isOpen, toggle, absencesDates }) => {
  // Disable toggle and rotation if absencesDates is empty or undefined
  const isDisabled =
    !Array.isArray(absencesDates) || absencesDates.length === 0;

  return (
    <Button
      onClick={!isDisabled ? toggle : undefined}
      disabled={isDisabled}
      className="fs-4"
      style={{
        backgroundColor: "transparent",
        border: "none",
        color: "#2a1f7e",
        width: "50px",
        height: "30px",
        padding: "0",
      }}
    >
      {isOpen ? (
        <IoCaretUpCircle
          style={{ transform: "rotate(180deg)", transition: "transform 0.3s" }}
        />
      ) : (
        <IoCaretDownCircle
          style={{ transform: "rotate(0deg)", transition: "transform 0.3s" }}
        />
      )}
    </Button>
  );
};

export default AttendanceSummary;
