import axios from 'axios';
import FormData from 'form-data';

const BASE_URL = 'http://0.0.0.0:8888'; // Update this to your FastAPI URL

export const checkAttendance = async (file) => {
    try {
        if (!file) {
            return { success: false, message: 'Group photo is required.' };
        }

        const form = new FormData();
        form.append('group_photo', file.buffer, file.originalname); 

        const response = await axios.post(`${BASE_URL}/check-attendance/`, form, {
            headers: {
                ...form.getHeaders(), 
            },
        });

        return { success: true, attendanceData: response.data };

    } catch (error) {
        console.error('Error checking attendance:', error.response ? error.response.data : error.message);
        return { success: false, message: error.message };
    }
};
