import React, { useState, useCallback } from "react";
import { Button, Table } from "react-bootstrap";

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
  // Disable toggle and rotation if absencesDates is empty
  const isDisabled = absencesDates.length === 0;

  return (
    <Button
      variant="outline-secondary"
      onClick={!isDisabled ? toggle : undefined}
      style={{
        padding: "0.25rem 0.5rem",
        fontSize: "1rem",
        transition: "all 0.25s",
      }}
      disabled={isDisabled}
    >
      <span
        style={{
          display: "inline-block",
          transform: isDisabled ? "none" : `rotate(${isOpen ? 180 : 0}deg)`,
        }}
      >
        &#x25BC; {/* Unicode for down arrow */}
      </span>
    </Button>
  );
};

// TableSection component
const TableSection = ({ entry }) => {
  const { isOpen, toggle } = useOpenController(false);

  return (
    <>
      <tr>
        <td>{entry.idNumber}</td>
        <td>{entry.name}</td>
        <td>{entry.absencesDates.length}</td>
        <td>
          <ExpandableButton
            isOpen={isOpen}
            toggle={toggle}
            absencesDates={entry.absencesDates}
          />
        </td>
      </tr>
      {isOpen && entry.absencesDates.length > 0 && (
        <tr>
          <td colSpan={2}></td>
          <td colSpan={2}>
            <ul className="text-start ms-0 m-2">
              {entry.absencesDates.map((date, index) => (
                <li key={index}>{date}</li>
              ))}
            </ul>
          </td>
        </tr>
      )}
    </>
  );
};

// Main Table component
const MainTable = ({ info }) => {
  return (
    <Table
      striped
      bordered
      hover
      className="text-center ms-3 me-3"
      id="summaryTable"
    >
      <thead>
        <tr>
          <th>ID Number</th>
          <th>Name</th>
          <th>Number of Absences</th>
          <th>Details</th>
        </tr>
      </thead>
      <tbody>
        {info.map((entry) => (
          <TableSection key={entry.idNumber} entry={entry} />
        ))}
      </tbody>
    </Table>
  );
};

// AttendanceSummaryTable component
const AttendanceSummary = ({ info }) => {
  return <MainTable info={info} />;
};

export default AttendanceSummary;
