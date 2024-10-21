import express from 'express';
import multer from 'multer';
import { checkAttendance } from '../controller/attendanceController.js';

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

// Route to handle file upload and attendance check
router.post('/check-attendance/', upload.single('group_photo'), async (req, res) => {
    try {
        const result = await checkAttendance(req.file);

        return res.status(result.success ? 200 : 400).json(result);

    } catch (error) {
        console.error('Error in attendance route:', error);
        return res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

export default router;