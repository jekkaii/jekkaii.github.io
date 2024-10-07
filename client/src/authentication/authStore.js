import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api/auth";

axios.defaults.withCredentials = true; // set withCredentials to true

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  error: null,
  isLoading: false,
  authenticated: false,
  isAdmin: false,
  isTeacher: false,
  setLoading: (isLoading) => set({ isLoading }),
  // setAuthenticated: () => set((state) => ({ authenticated: true })),
  //   setUser: (user) => set({ user }),
  //   setToken: (token) => set({ token }),
  //   setError: (error) => set({ error }),
  login: async (username, password) => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(`${API_URL}/`, {
        username,
        password,
      });
      const { user, token } = response.data;
      if (user.role === "admin") {
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
    } catch (error) {
      set({
        success: false,
        error: error.response.data.message,
        isLoading: false,
      });
    }
  },
  logout: async () => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.post(`${API_URL}/logout`);
      if (response.status === 200) {
        set({
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
      set({
        success: false,
        error: error.response.data.message,
        isLoading: false,
      });
    }
  },

  checkAuthentication: async () => {
    set({ isLoading: true });
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await axios.get(`${API_URL}/check-auth`);
      if (response.status === 200) {
        const { user, token } = response.data;
        if (user.role === "admin") {
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
      set({
        success: false,
        error: error.response.data.message,
        isLoading: false,
      });
    }
  },

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
