/* eslint-disable no-unused-vars */
import { React, useEffect } from "react";
import { Col, Row, Statistic, Card, Flex, Table } from "antd";
import { useClassStore } from "../stores/classStore";
import { Link } from "react-router-dom";
import {
  CalendarOutlined,
  IdcardOutlined,
  SearchOutlined,
  SettingOutlined,
  TagOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAuthStore } from "../stores/authStore";

export default function Dashboard() {
  const { classCount, countClass } = useClassStore();
  const { readClasses, classes, isLoading, error } = useClassStore();
  const { isTeacher, isAdmin } = useAuthStore();

  const items = classes.slice(0, 4).map((Item) => ({
    key: Item._id,
    classCode: Item.classCode,
    subject: Item.subject,
    schedule: Item.startTime + " - " + Item.endTime,
    studentCount: classCount,
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
      dataIndex: "classCode",
      key: "classCode",
    },
    {
      title: (
        <>
          <Flex gap={6}>
            <TagOutlined />
            <span>Subject</span>
          </Flex>
        </>
      ),
      dataIndex: "subject",
      key: "subject",
    },
    {
      title: (
        <Flex gap={6}>
          <UserOutlined />
          <span>Number of Students</span>
        </Flex>
      ),
      dataIndex: "studentCount",
      key: "studentCount",
    },
  ];

  useEffect(() => {
    readClasses();
  }, [readClasses]);

  useEffect(() => {
    countClass();
  }, [classCount, countClass]);

  return (
    <Flex vertical gap={16}>
      {isTeacher && (
        <>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Statistic title="Number of Classes" value={classCount} />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <Statistic title="Number of Students" value={classCount} />
              </Card>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Card>
                <Flex justify="space-between" className="mb-3">
                  <span className="title fw-bold fs-6">Classes</span>
                  <Link
                    className="text-decoration-none text-secondary m-0"
                    to="/teacher"
                  >
                    View All
                  </Link>
                </Flex>
                <Table
                  className="rounded"
                  dataSource={items}
                  columns={columns}
                  loading={isLoading}
                  size="small"
                  pagination={false}
                />
              </Card>
            </Col>
            <Col span={12}>
              <Card>
                <span>Manage Students</span>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </Flex>
  );
}
