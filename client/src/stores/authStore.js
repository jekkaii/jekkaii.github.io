import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api/auth";

axios.defaults.withCredentials = true; // set withCredentials to true

// This store manages the authentication state of the user
export const useAuthStore = create((set) => ({
  themeDefault: "light",
  user: null, // The user object obtained from the server
  token: null, // The authentication token obtained from the server
  error: null, // Any error messages that occur during authentication
  isLoading: false, // Whether the login or logout request is in progress
  isLoggingIn: false, // Whether the login request is in progress
  authenticated: false, // Whether the user is authenticated
  isAdmin: false, // Whether the user is an admin
  isTeacher: false, // Whether the user is a teacher

  // Set the loading state to the given value
  setLoading: (isLoading) => set({ isLoading }),

  // Log the user in
  login: async (username, password) => {
    set({ isLoggingIn: true });

    try {
      // Make the login request to the server
      const response = await axios.post(`${API_URL}/`, {
        username,
        password,
      });
      const { user, token } = response.data;
      localStorage.setItem("token", token);
      if (user.role === "Admin") {
        // If the user is an admin, set the corresponding state
        set({
          user,
          token,
          authenticated: true,
          isAdmin: true,
          isTeacher: false,
          error: null,
          isLoggingIn: false,
        });
      } else {
        // If the user is a teacher, set the corresponding state
        set({
          user,
          token,
          authenticated: true,
          isAdmin: false,
          isTeacher: true,
          error: null,
          isLoggingIn: false,
        });
      }
    } catch (error) {
      // If there is an error, set the error state
      set({
        success: false,
        error: error.response.data.message,
        isLoggingIn: false,
      });
    }
  },

  // Log the user out
  logout: async () => {
    set({ isLoading: true });
    try {
      // This delay is for testing purposes
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Make the logout request to the server

      localStorage.removeItem("token");
      localStorage.removeItem("theme");

      const response = await axios.post(`${API_URL}/logout`);
      if (response.status === 200) {
        // If the logout is successful, reset the state
        set({
          themeDefault: "light",
          user: null,
          token: null,
          authenticated: false,
          isAdmin: false,
          isTeacher: false,
          error: null,
          isLoading: false,
        });
      }
    } catch (error) {
      // If there is an error, set the error state
      set({
        success: false,
        error: error.response.data.message,
        isLoading: false,
      });
    }
  },

  // Check if the user is authenticated
  checkAuthentication: async () => {
    set({ isLoading: true });
    try {
      // This delay is for testing purposes
      const response = await axios.get(`${API_URL}/check-auth`);
      if (response.status === 200) {
        const { user, token } = response.data;
        if (user.role === "Admin") {
          // If the user is an admin, set the corresponding state
          set({
            user,
            token,
            authenticated: true,
            isAdmin: true,
            isTeacher: false,
            error: null,
            isLoading: false,
          });
        } else {
          // If the user is a teacher, set the corresponding state
          set({
            user,
            token,
            authenticated: true,
            isAdmin: false,
            isTeacher: true,
            error: null,
            isLoading: false,
          });
        }
      }
    } catch (error) {
      // If there is an error, set the error state
      set({
        user: null,
        token: null,
        success: false,
        error: error.response.data.message,
        isLoading: false,
      });
    }
  },

  restoreAuthentication: () => {
    const token = localStorage.getItem("token");

    if (token) {
      set({
        token,
        authenticated: true,
        error: null,
      });
    }
  },

  // Check if the user is an admin
  checkAdmin: async () => {
    try {
      const response = await axios.get(`${API_URL}/check-admin`);

      if (response.status === 200) {
        set({ isAdmin: true, isTeacher: false });
      }
    } catch (error) {
      set({ success: false, error: error.response.data.message });
    }
  },
}));
