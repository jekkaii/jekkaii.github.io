import { ClassModel } from "../model/Class.js";
import { UserModel } from "../model/User.js";

export const addClass = async (req, res) => {
  try {
    const {
      classCode,
      courseNumber,
      subject,
      academicYear,
      term,
      room,
      days,
      startTime,
      endTime,
      students = [],
    } = req.body;

    if (
      !classCode ||
      !courseNumber ||
      !subject ||
      !academicYear ||
      !term ||
      !room ||
      !days ||
      !startTime ||
      !endTime
    ) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await UserModel.findOne({ _id: req.userId }).select(
      "-password"
    );

    const existingClass = await ClassModel.findOne({ classCode });

    if (existingClass) {
      return res
        .status(400)
        .json({ success: false, message: "Class already exists" });
    }

    const newClass = new ClassModel({
      classCode,
      courseNumber,
      subject,
      academicYear,
      term,
      room,
      days,
      startTime,
      endTime,
      teacherId: user._id,
      students,
    });
    const savedClass = await newClass.save();
    user.classes.push(savedClass._id);
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "Class created successfully" });
  } catch (error) {
    console.error("Error creating class:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteClass = async (req, res) => {
  try {
    const { classCode } = req.body;
    if (!classCode) {
      return res
        .status(400)
        .json({ success: false, message: "Class code is required" });
    }
    const existingClass = await ClassModel.findOne({ classCode });
    if (!existingClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    await ClassModel.deleteOne({ classCode });
    return res
      .status(200)
      .json({ success: true, message: "Class deleted successfully" });
  } catch (error) {
    console.error("Error deleting class:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const updateClass = async (req, res) => {
  try {
    const { classCode } = req.body;
    if (!classCode) {
      return res
        .status(400)
        .json({ success: false, message: "Class code required" });
    }
    const existingClass = await ClassModel.findOne({ classCode });
    if (!existingClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    existingClass.classCode = req.body.classCode;
    existingClass.courseNumber = req.body.courseNumber;
    existingClass.subject = req.body.subject;
    existingClass.academicYear = req.body.academicYear;
    existingClass.term = req.body.term;
    existingClass.room = req.body.room;
    existingClass.days = req.body.days;
    existingClass.startTime = req.body.startTime;
    existingClass.endTime = req.body.endTime;
    existingClass.teacherId = req.body.teacherId;
    existingClass.students = req.body.students;
    await existingClass.save();
    return res
      .status(200)
      .json({ success: true, message: "Class updated successfully" });
  } catch (error) {
    console.error("Error updating class:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getClass = async (req, res) => {
  try {
    const { classCode } = req.body;
    if (!classCode) {
      return res
        .status(400)
        .json({ success: false, message: "Class code is required" });
    }
    const existingClass = await ClassModel.findOne({ classCode });
    if (!existingClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }
    return res.status(200).json({ success: true, class: existingClass });
  } catch (error) {
    console.error("Error getting class:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const readClasses = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId }).select(
      "-password"
    );
    const classes = await ClassModel.find({ teacherId: user._id });
    return res.status(200).json({ success: true, classes });
  } catch (error) {
    console.error("Error reading classes:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
// Add this new function in your classController.js

export const archiveClass = async (req, res) => {
  try {
    const { classCode } = req.body;
    if (!classCode) {
      return res
        .status(400)
        .json({ success: false, message: "Class code is required" });
    }
    const existingClass = await ClassModel.findOne({ classCode });
    if (!existingClass) {
      return res
        .status(404)
        .json({ success: false, message: "Class not found" });
    }

    existingClass.archived = true; // or whatever logic you need to mark as archived
    await existingClass.save();

    return res
      .status(200)
      .json({ success: true, message: "Class archived successfully" });
  } catch (error) {
    console.error("Error archiving class:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
