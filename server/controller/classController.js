import bycrpt from "bcryptjs";
import { ClassModel } from "../model/Class.js";

export const addClass = async (req, res) => {
    try {
        const { teacher, students = [], classCode, courseNumber, subject, academicYear, term, room, days, startTime, endTime } = req.body;

        if (!classCode || !courseNumber || !subject || !academicYear || !term || !room || !days || !startTime || !endTime ) { // Check if all fields are provided
            return res.status(400).json({ success: false, message: "All fields are required" });
        }        

        // const { user } = useAuth0();

        const existingClass = await ClassModel.findOne({ classCode });

        if (existingClass) {
            return res.status(400).json({ success: false, message: "Class already exists" });
        }
        
        const newClass = new ClassModel({
            teacher: teacher || null, // Set to null in the meantime while teacher user._id is not yet implemented
            students,
            classCode,
            courseNumber,
            subject,
            academicYear,
            term,
            room,
            days, 
            startTime,
            endTime
        });
        await newClass.save();
        return res.status(200).json({ success: true, message: "Class created successfully" });
    } catch (error) {
        console.error("Error creating class:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const deleteClass = async (req, res) => {
    try {
        const { classCode } = req.body;
        if (!classCode) {
            return res.status(400).json({ success: false, message: "Class code is required" });
        }
        const existingClass = await ClassModel.findOne({ classCode });
        if (!existingClass) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }
        await ClassModel.deleteOne({ classCode });
        return res.status(200).json({ success: true, message: "Class deleted successfully" });
    } catch (error) {
        console.error("Error deleting class:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const updateClass = async (req, res) => {
    try {
        const { classCode} = req.body;
        if (!classCode) {
            return res.status(400).json({ success: false, message: "Class code required" });
        }
        const existingClass = await ClassModel.findOne({ classCode });
        if (!existingClass) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }
        const hashedPassword = bycrpt.hashSync(password, 12);
        existingClass.password = hashedPassword;
        await existingClass.save();
        return res.status(200).json({ success: true, message: "Class updated successfully" });
    } catch (error) {
        console.error("Error updating class:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const getClass = async (req, res) => {
    try {
        const { classCode } = req.body;
        if (!classCode) {
            return res.status(400).json({ success: false, message: "Class code is required" });
        }
        const existingClass = await ClassModel.findOne({ classCode });
        if (!existingClass) {
            return res.status(404).json({ success: false, message: "Class not found" });
        }
        return res.status(200).json({ success: true, class: existingClass });
    } catch (error) {
        console.error("Error getting class:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

export const readClasses = async (req, res) => {
    try {
        const classes = await ClassModel.find();
        return res.status(200).json({ success: true, classes });
    } catch (error) {
        console.error("Error reading classes:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};