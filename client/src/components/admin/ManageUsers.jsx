// src/components/ManageUsers.jsx
import React, { useState } from "react";
import "../css/style.css"; // Import the stylesheet

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

const ManageUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");

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
    <div className="container">
      <div className="header">
        <input
          type="text"
          placeholder="Search here..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <button className="add-user-btn" onClick={addUser}>
          + ADD USER
        </button>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Account Status</th>
            <th>Actions</th>
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
                <button
                  className={`status-btn ${
                    user.status ? "status-activated" : "status-deactivated"
                  }`}
                  onClick={() => toggleUserStatus(user.id)}
                >
                  {user.status ? "Activated" : "Deactivated"}
                </button>
              </td>
              <td>
                <button
                  className="delete-btn"
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
