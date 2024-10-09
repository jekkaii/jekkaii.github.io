import bycrpt from "bcryptjs";
import { ClassModel } from "../model/Class.js";

export const addClass = async (req, res) => {
    try {
        const { teacher, students, classCode, courseNumber, subject, time, room, schedule, academicYear, term } = req.body;
        if (!teacher || !students || !classCode || !courseNumber || !subject || !time || !room || !schedule || !academicYear || !term) { // Check if all fields are provided
            return res.status(400).json({ success: false, message: "All fields are required" });
        }        
        const existingClass = await ClassModel.findOne({ classCode });
        if (existingClass) {
            return res.status(400).json({ success: false, message: "Class already exists" });
        }
        const hashedPassword = bycrpt.hashSync(req.body.password, 12);
        const newClass = new ClassModel({
            teacher,
            students,
            classCode,
            courseNumber,
            subject,
            time,
            room,
            schedule,
            academicYear,
            term,
            password: hashedPassword
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