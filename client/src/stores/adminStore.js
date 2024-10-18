import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api/admin";

axios.defaults.withCredentials = true; // set withCredentials to true

export const useAdminStore = create((set) => ({
  users: [],
  error: null,
  success: null,
  message: null,
  isLoading: false,
  getUsers: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/users`);
      if (response.status === 200) {
        const { users } = response.data;
        set({ users, isLoading: false, error: null });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
  addUser: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/users`, userData);
      if (response.status === 201) {
        set({ success: true, message: "User added successfully" });
      }
    } catch (error) {
      set({ error, success: false });
    }
  },
  editUser: async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userData.id}`, userData);
      if (response.status === 200) {
        set({ success: true, message: "User updated successfully" });
      }
    } catch (error) {
      set({ error, success: false });
    }
  },
  deleteUser: async (userId) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${userId}`);
      if (response.status === 200) {
        set({ success: true, message: "User deleted successfully" });
      }
    } catch (error) {
      set({ error, success: false });
    }
  },
  updateStatus: async (userId, status) => {
    try {
      const response = await axios.put(`${API_URL}/users/${userId}/status`, { status });
      if (response.status === 200) {
        set({ success: true, message: "User status updated successfully" });
      }
    } catch (error) {
      set({ error, success: false });
    }
  },
}));