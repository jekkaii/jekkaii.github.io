import bycrpt from "bcrypt";
import { UserModel } from "../model/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const addStudent = async (req, res) => {
  try {
    const { idNumber, name, courseNyear, email, status } = req.body;

    if (!idNumber || !name || !courseNyear || !email || !status) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });
    // const existingId = await UserModel.findOne({ idNumber });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const responseData = {
      success: true,
      message: "Student created successfully",
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};


 
const sampleStudents = [
  {
    idNumber: "2021-123456",
    name: "John Doe",
    courseNyear: "BSIT-1",
    email: "john.doe@example.com",
    status: "Active",
  },
  {
    idNumber: "2021-789012",
    name: "Jane Doe",
    courseNyear: "BSIT-2",
    email: "jane.doe@example.com",
    status: "Inactive",
  },
  {
    idNumber: "2021-345678",
    name: "Bob Smith",
    courseNyear: "BSIT-3",
    email: "bob.smith@example.com",
    status: "Active",
  },
];

export const getStudents = async (req, res) => {
  try {
    // Return the list of students
    return res.status(200).json({
      success: true,
      data: sampleStudents,
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
  try{
    const { idNumber, password } = req.body;
    if (!idNumber || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ idNumber });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const hashedPassword = await bycrpt.hash(password, 12);
    existingUser.password = hashedPassword;
    await existingUser.save();
    return res.status(200).json({ success: true, message: "Password updated" });
  }
  catch(error){
    console.error("Error updating password:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
}
export const updateStudent = async (req, res) => {
  try {
    const { idNumber, name, courseNyear, email, status } = req.body;  
    if (!idNumber || !name || !courseNyear || !email || !status) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ email });
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

export const deleteStudent = async (req, res) => {
  try {
    const { idNumber } = req.body;
    if (!idNumber) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const existingUser = await UserModel.findOne({ idNumber });
    if (!existingUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    await existingUser.remove();
    return res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(400).json({ success: false, message: error.message });
  } 
};

