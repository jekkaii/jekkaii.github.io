import React, { useState, useCallback } from "react";
import { Button, Table } from "react-bootstrap";
import { IoCaretDownCircle, IoCaretUpCircle } from "react-icons/io5";

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
  const isDisabled = !Array.isArray(absencesDates) || absencesDates.length === 0;

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
        <IoCaretUpCircle style={{ transform: "rotate(180deg)", transition: "transform 0.3s" }} />
      ) : (
        <IoCaretDownCircle style={{ transform: "rotate(0deg)", transition: "transform 0.3s" }} />
      )}
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
      <td>{Array.isArray(entry.absencesDates) ? entry.absencesDates.length : 0}</td>
      <td>
        <ExpandableButton
          isOpen={isOpen[entry.idNumber]} 
          toggle={() => toggle(entry.idNumber)}
          absencesDates={entry.absencesDates}
        />
      </td>
    </tr>
    {isOpen[entry.idNumber] && Array.isArray(entry.absencesDates) && entry.absencesDates.length > 0 && (
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
