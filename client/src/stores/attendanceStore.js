import { create } from "zustand";
import axios from "axios";

const API_URL = "http://localhost:3001/api/teacher"; 

axios.defaults.withCredentials = true; 

export const useAttendanceStore = create((set) => ({
  attendanceData: [],     
  isLoading: false,       
  error: null,            

checkAttendance: async (file) => {
    set({ isLoading: true, error: null });
    try {
      const formData = new FormData();
      formData.append("group_photo", file);
  
      const response = await axios.post(`${API_URL}/check-attendance`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Log the response status and data
      console.log("Response status:", response.status);
      console.log("Response data:", response.data);
  
      if (response.status === 200) {
        const { attendanceData } = response.data;
        console.log("Attendance data:", attendanceData); // Log attendance data
  
        // Update state and return attendance data
        set((state) => ({
          attendanceData: [...state.attendanceData, ...attendanceData],
          isLoading: false,
          error: null,
        }));
  
        return attendanceData; 
      } 
    } catch (error) {
      set({ isLoading: false, error: error.response?.data || "Failed to check attendance." });
      return "Failed to check attendance."; 
    }
  },

  // Method to clear attendance data
//   clearAttendance: () => {
//     set({ attendanceData: [], error: null });
//   },
}));

export default useAttendanceStore;