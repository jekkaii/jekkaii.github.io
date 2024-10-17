import axios from 'axios';
import FormData from 'form-data';

const BASE_URL = 'http://0.0.0.0:8888'; // Update this to your FastAPI URL

export const checkAttendance = async (file) => {
    try {
        // Check if the file is provided
        if (!file) {
            return { success: false, message: 'Group photo is required.' };
        }

        // Create a FormData object to send the uploaded image
        const form = new FormData();
        form.append('group_photo', file.buffer, file.originalname); // Use buffer from memory storage

        // Send POST request to the Python FastAPI attendance service
        const response = await axios.post(`${BASE_URL}/check-attendance/`, form, {
            headers: {
                ...form.getHeaders(), // Get the headers required for multipart/form-data
            },
        });

        // Return success with attendance data from FastAPI
        return { success: true, attendanceData: response.data };

    } catch (error) {
        // Log the error and return a failure response
        console.error('Error checking attendance:', error.response ? error.response.data : error.message);
        return { success: false, message: error.message };
    }
};
