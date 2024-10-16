/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { useState } from "react";
import { Button, Table } from "react-bootstrap";

const DailyAttendance = ({ handleManualAttendance, sortedData }) => {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      <Table
        striped
        bordered
        hover
        className="attendance-table text-center ms-3 me-3"
        id="dailyTable"
      >
        <thead>
          <tr>
            <th>ID Number</th>
            <th>Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.idNumber}</td>
              <td>{entry.name}</td>
              <td>
                <Button
                  onClick={() => handleManualAttendance(entry.idNumber)}
                  className={`button ${
                    entry.status === "Absent" ? "absent" : ""
                  }`}
                  id="statusButton"
                >
                  {entry.status}
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={2}></td>
            <td>
              <Button
                id="saveDaily"
                className="text-end fw-bold"
                variant="primary"
              >
                Save
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default DailyAttendance;
