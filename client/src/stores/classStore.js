import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api";

axios.defaults.withCredentials = true; // set withCredentials to true

export const useClassStore = create((set) => ({
  class: [],
  error: null,
  success: null,
  message: null,
  isLoading: false,
  
  getClasses: async () => {
    set({ isLoading: true });
    try {
      //   await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(`${API_URL}/classes`);
      if (response.status === 200) {
        const { classes } = response.data;
        set({ classes, isLoading: false, error: null });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },

  addClass: async (newClass) => {
    set({ isLoading: true });
    try {
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(`${API_URL}/classes`, newClass);
      if (response.status === 200) {
        const { class: newClass } = response.data; // using alias
        set({
          success: true,
          message: "Class added successfully",
          class: newClass,
          isLoading: false,
        });
      }
    } catch (error) {
      set({ error, isLoading: false });
    }
  },
}));