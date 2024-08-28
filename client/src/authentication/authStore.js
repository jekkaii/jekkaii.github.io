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
  //   setAuthenticated: (authenticated) => set({ authenticated }),
  //   setUser: (user) => set({ user }),
  //   setToken: (token) => set({ token }),
  //   setError: (error) => set({ error }),
  //   setLoading: (loading) => set({ loading }),
  login: async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/`, {
        email,
        password,
      });
      if (response.status === 200) {
        const { user, token } = response.data;
        set({ user, token, authenticated: true });
      }
    } catch (error) {
      set({ error });
    }
  },

  checkAuthentication: async () => {
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      if (response.status === 200) {
        const { user, token } = response.data;
        set({ user, token, authenticated: true });
      }
    } catch (error) {
      set({ error });
    }
  },
}));
