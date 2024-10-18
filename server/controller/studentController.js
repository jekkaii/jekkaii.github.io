import { StudentModel } from "../model/Student.js";
import { ClassModel } from "../model/Class.js";

// import * as xlsx from 'xlsx';
//import multer from 'multer';

export const addStudent = async (req, res) => {
  try {
    const { idNumber, name, course, year } = req.body;

    if (!idNumber || !name) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingId = await StudentModel.findOne({ idNumber });

    if (existingId) {
      return res
        .status(400)
        .json({ success: false, message: "Student already exists" });
    }

    const newStudent = new StudentModel({
      idNumber,
      name,
      course,
      year,
    });

    await newStudent.save();

    const responseData = {
      success: true,
      message: "Student created successfully",
      student: newStudent,
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const getStudents = async (req, res) => {
  try {
    const classCode = req.params.id;
    const foundClass = await ClassModel.findOne({ classCode }).populate("students");

    if (!foundClass) {
      return res.status(404).json({
        success: false,
        message: "No class found",
      });
    }

    const students = foundClass.students;

    if (!students) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    }

    return res.status(200).json({
      success: true,
      students,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const countStudents = async (req, res) => {
  try {
    const classCode = req.params.id;
    const foundClass = await ClassModel.findOne({ classCode }).populate(
      "students"
    );
    const count = foundClass.students.length;

    if (!count) {
      return res.status(404).json({
        success: false,
        message: "No students found",
      });
    }

    return res.status(200).json({
      success: true,
      count,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { idNumber, password } = req.body;
    if (!idNumber || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await StudentModel.findOne({ idNumber });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const hashedPassword = bycrpt.hashSync(password, 12);
    existingUser.password = hashedPassword;
    await existingUser.save();
    return res.status(200).json({ success: true, message: "Password updated" });
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const updateStudent = async (req, res) => {
  try {
    const { idNumber, name, courseNyear, email, status } = req.body;
    if (!idNumber || !name || !courseNyear || !email || !status) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await StudentModel.findOne({ email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    existingUser.idNumber = idNumber;
    existingUser.name = name;
    existingUser.courseNyear = courseNyear;
    existingUser.email = email;
    existingUser.status = status;
    await existingUser.save();
    return res.status(200).json({ success: true, message: "User updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateStudentStatus = async (req, res) => {
  try {
    const { idNumber, status } = req.body;
    if (!idNumber || !status) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await StudentModel.findOne({ idNumber });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    existingUser.status = status;
    await existingUser.save();
    return res.status(200).json({ success: true, message: "User updated" });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteStudents = async (req, res) => {
  try {
    const { idNumbers } = req.body;
    if (!idNumbers) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUsers = await StudentModel.find({
      idNumber: { $in: idNumbers },
    });
    if (!existingUsers.length) {
      return res
        .status(404)
        .json({ success: false, message: "No users found" });
    }
    await StudentModel.deleteMany({ idNumber: { $in: idNumbers } });
    return res.status(200).json({ success: true, message: "Users deleted" });
  } catch (error) {
    console.error("Error deleting users:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const importFile = async (req, res) => {
  const file = req.files ? req.files.file : undefined;
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file uploaded" });
  }

  try {
    const workbook = xlsx.readFile(file.tempFilePath);
    const worksheet = workbook.Sheets["Sheet1"];
    const data = xlsx.utils.sheet_to_json(worksheet);

    const existingIds = await StudentModel.distinct("idNumber");
    const duplicateIds = data.filter((item) =>
      existingIds.includes(item.idNumber)
    );
    if (duplicateIds.length) {
      return res.status(400).json({
        success: false,
        message: `The following idNumbers are already in the database: ${duplicateIds
          .map((item) => item.idNumber)
          .join(", ")}`,
      });
    }

    await StudentModel.insertMany(data);
    return res
      .status(200)
      .json({ success: true, message: "File imported successfully" });
  } catch (error) {
    console.error("Error importing file:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
