// stores/themeStore.js
import { create } from "zustand";

// Helper functions for LocalStorage
const getStoredTheme = () => localStorage.getItem("theme") || "light";
const storeTheme = (theme) => localStorage.setItem("theme", theme);

export const useThemeStore = create((set) => ({
  theme: getStoredTheme(), // Retrieve theme from localStorage on initialization
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      storeTheme(newTheme); // Save the new theme to localStorage
      return { theme: newTheme };
    }),
}));

export default useThemeStore;
