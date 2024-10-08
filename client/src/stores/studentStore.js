import { create } from "zustand";
import axios from "axios";
import { updateStudentStatus } from "../../../server/controller/studentController";

const API_URL = "http://localhost:3001/api/teacher";

axios.defaults.withCredentials = true; // set withCredentials to true

export const useStudentStore = create((set) => ({
  students: [],
  error: null,
  success: null,
  message: null,
  isLoading: false,
  getStudents: async () => {
    set({ isLoading: true });
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(`${API_URL}/students`);
      if (response.status === 200) {
        const { students } = response.data;
        set({ students, isLoading: false, error: null });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  addStudent: async (newStudent) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(`${API_URL}/students`, newStudent);
      if (response.status === 200) {
        const { student } = response.data;
        set({
          success: true,
          message: "Student added successfully",
          student,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  deleteStudent: async (id) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.delete(`${API_URL}/students/${id}`);
      if (response.status === 200) {
        set({
          success: true,
          message: "Student deleted successfully",
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  updateStudent: async (id, updatedStudent) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.put(
        `${API_URL}/students/${id}`,
        updatedStudent
      );
      if (response.status === 200) {
        set({
          success: true,
          message: "Student updated successfully",
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  updateStudentStatus: async (id, status) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await updateStudentStatus(id, status);
      if (response.status === 200) {
        set({
          success: true,
          message: "Student status updated successfully",
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));
