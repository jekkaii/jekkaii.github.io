import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api/auth";

axios.defaults.withCredentials = true; // set withCredentials to true

export const useAuthStore = create((set) => ({
  user: null,
  token: null,
  error: null,
  loading: false,
  authenticated: false,
  isAdmin: false,
  isTeacher: false,
  isLoading: false,
  isCheckingAuthentication: false,
  // setAuthenticated: () => set((state) => ({ authenticated: true })),
  //   setUser: (user) => set({ user }),
  //   setToken: (token) => set({ token }),
  //   setError: (error) => set({ error }),
  //   setLoading: (loading) => set({ loading }),
  login: async (username, password) => {
    set({ loading: true });
    try {
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
          loading: false,
        });
      } else {
        set({
          user,
          token,
          authenticated: true,
          isAdmin: false,
          isTeacher: true,
          error: null,
          loading: false,
        });
      }
    } catch (error) {
      set({
        success: false,
        error: error.response.data.message,
        loading: false,
      });
    }
  },
  logout: async () => {
    try {
      const response = await axios.post(`${API_URL}/logout`);
      if (response.status === 200) {
        set({
          user: null,
          token: null,
          authenticated: false,
          isAdmin: false,
          isTeacher: false,
          error: null,
          loading: false,
        });
      }
    } catch (error) {
      set({
        success: false,
        error: error.response.data.message,
        loading: false,
      });
    }
  },

  checkAuthentication: async () => {
    set({ isCheckingAuthentication: true });
    try {
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
            loading: false,
            isCheckingAuthentication: false,
          });
        } else {
          set({
            user,
            token,
            authenticated: true,
            isAdmin: false,
            isTeacher: true,
            error: null,
            loading: false,
            isCheckingAuthentication: false,
          });
        }
      }
    } catch (error) {
      set({
        success: false,
        error: error.response.data.message,
        loading: false,
        isCheckingAuthentication: false,
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
