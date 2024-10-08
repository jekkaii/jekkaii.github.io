// src/components/ManageUsers.jsx
import React, { useState } from "react";
import "../css/style.css"; // Import the stylesheet for custom styling
import { Button, Table, Form, Modal } from "react-bootstrap"; // Using Bootstrap for table, buttons, and modal
import AddUser from "./AddUser";
import EditUser from "./EditUser";

const initialUsers = [
  {
    id: 1,
    firstName: "Andrada",
    lastName: "Celestine",
    email: "celandrada@slu.edu.ph",
    role: "Admin",
    status: true,
  },
  {
    id: 2,
    firstName: "Bergonio",
    lastName: "Adrian",
    email: "abergonio@slu.edu.ph",
    role: "Employee",
    status: true,
  },
  {
    id: 3,
    firstName: "Camio",
    lastName: "Cedric Sen",
    email: "cedcamio@slu.edu.ph",
    role: "Employee",
    status: true,
  },
  {
    id: 4,
    firstName: "De Guzman",
    lastName: "George",
    email: "georgedg@slu.edu.ph",
    role: "Employee",
    status: true,
  },
  {
    id: 5,
    firstName: "Efraim",
    lastName: "Heleina",
    email: "hefraim@slu.edu.ph",
    role: "Admin",
    status: true,
  },
  {
    id: 6,
    firstName: "Friedman",
    lastName: "Rhiannon",
    email: "rfriedman@slu.edu.ph",
    role: "Admin",
    status: false,
  },
  {
    id: 7,
    firstName: "Gelnn",
    lastName: "Kurt",
    email: "kgelnn@slu.edu.ph",
    role: "Employee",
    status: false,
  },
];

const ConfirmationModal = ({ isOpen, message, onConfirm, onCancel }) => {
  return (
    <Modal show={isOpen} onHide={onCancel} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteMode, setDeleteMode] = useState(false); // Tracks if delete action is being confirmed
  const handleSearch = (e) => setSearchTerm(e.target.value.toLowerCase());

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, status: !user.status } : user
      )
    );
  };
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleToggleChange = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };
  const handleDeleteUser = (user) => {
    setSelectedUser(user);
    setModalMessage(
      `Are you sure you want to delete ${user.firstName} ${user.lastName}?`
    );
    setDeleteMode(true);
    setShowModal(true);
  };
  const handleConfirmToggle = () => {
    if (selectedUser) {
      toggleUserStatus(selectedUser.id);
    }
    setShowModal(false);
  };

  const handleCancelToggle = () => {
    setShowModal(false);
  };

  const addUser = () => {
    const newUser = {
      id: Date.now(),
      firstName: "New",
      lastName: "User",
      email: "newuser@slu.edu.ph",
      role: "Employee",
      status: true,
    };
    setUsers([...users, newUser]);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(searchTerm) ||
      user.lastName.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="container mt-5">
      <div className="header d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
          className="form-control search-input"
          style={{ maxWidth: "300px" }}
        />
        <EditUser />
        <AddUser />
      </div>

      <Table bordered hover responsive className="user-table">
        <thead>
          <tr>
            <th>
              <Form.Check type="checkbox" label="" />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Account Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <Form.Check
                  type="switch"
                  id={`status-switch-${user.id}`}
                  checked={user.status}
                  onChange={() => handleToggleChange(user)}
                  label={user.status ? "Activated" : "Deactivated"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirmation modal */}
      {selectedUser && (
        <ConfirmationModal
          isOpen={showModal}
          message={`Are you sure you want to ${
            selectedUser.status ? "deactivate" : "activate"
          } ${selectedUser.firstName} ${selectedUser.lastName}?`}
          onConfirm={handleConfirmToggle}
          onCancel={handleCancelToggle}
        />
      )}
    </div>
  );
};

export default ManageUsers;
