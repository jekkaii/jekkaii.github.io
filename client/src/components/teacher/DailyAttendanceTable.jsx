import { Button, Table } from 'react-bootstrap';
import PropTypes from 'prop-types';

const DailyAttendanceTable = ({ filteredData, handleClick }) => {
  return (
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
        {filteredData.map((entry) => (
          <tr key={entry.id}>
            <td>{entry.idNumber}</td>
            <td>{entry.name}</td>
            <td>
              <Button
                onClick={() => handleClick(entry.id)}
                className={`button ${entry.status === "Absent" ? "absent" : ""}`}
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
  );
};

export default DailyAttendanceTable;
