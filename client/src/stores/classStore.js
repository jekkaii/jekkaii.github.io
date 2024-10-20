import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api/teacher";

axios.defaults.withCredentials = true; // For secure cookie handling

export const useClassStore = create((set) => ({
  existingClass: [],
  classes: [],
  classCount: 0,
  error: null,
  isLoading: false,

  readClasses: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/classes`);
      if (response.status === 200) {
        const { classes } = response.data;
        set({ classes, isLoading: false, error: null });
      } else {
        throw new Error("Failed to fetch classes");
      }
    } catch (error) {
      console.error("Error fetching classes:", error);
      set({ error: error.response?.data || error.message, isLoading: false });
    }
  },

  getClasses: async (id) => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/classes/${id}`);

      if (response.status === 200) {
        const { existingClass } = response.data;

        set({ existingClass, isLoading: false, error: null });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  addClass: async (newClass) => {
    set({ isLoading: true });
    try {
      const response = await axios.post(`${API_URL}/classes`, newClass);
      if (response.status === 200) {
        const { newClass } = response.data;
        set((state) => ({
          classes: [...state.classes, newClass],
          isLoading: false,
          error: null,
        }));
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteClass: async (classCode) => {
    set({ isLoading: true });
    try {
      const response = await axios.delete(`${API_URL}/classes`, {
        data: { classCode }, // Pass the classCode to the backend
      });
      if (response.status === 200) {
        set((state) => ({
          classes: state.classes.filter(
            (classItem) => classItem.classCode !== classCode
          ),
          isLoading: false,
          error: null,
        }));
        alert(response.data.message); // Optionally show a message
      }
    } catch (error) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateClass: async (id, updatedClass) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.put(
        `${API_URL}/classes/${id}`,
        updatedClass
      );
      
      if (response.status === 200) {
        set({
          success: true,
          message: "Class updated successfully",
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  countClass: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${API_URL}/count`);

      if (response.status === 200) {
        const { count } = response.data;
        set({ classCount: count, isLoading: false, error: null });
      } else {
        throw new Error("Failed to fetch count");
      }
    } catch (error) {
      console.error("Error fetching count:", error);
      set({ error: error.response?.data || error.message, isLoading: false });
    }
  },
}));
