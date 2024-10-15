/* eslint-disable no-unused-vars */
import React from "react";
import { Col, Row, Statistic, Card } from "antd";
import { useClassStore } from "../stores/classStore";
import { useEffect } from "react";

export default function Dashboard() {
  const { classCount, countClass } = useClassStore();

  useEffect(() => {
    countClass();
  }, [classCount, countClass]);

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Statistic title="Number of Classes" value={classCount} />
      </Col>
    </Row>
  );
}
