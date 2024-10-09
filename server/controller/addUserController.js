import bcrypt from "bcrypt";
import { UserModel } from "../model/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const addUser = async (req, res) => {
  try {
    validateAddUserInput(req);
    const { name, email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashedPassword, role });
    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);
    return res.status(201).json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    validateEditUserInput(req);
    const { id, name, email, role } = req.body;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.name = name;
    user.email = email;
    user.role = role;
    // if (role === "admin") {
    //   user.status = true;
    // } else {
    //   user.status = false;
    // }
    await user.save();
    return res.status(200).json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.error("Error editing user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    validateDeleteUserInput(req);
    const { id } = req.body;
    const user = await UserModel.findByIdAndRemove(id);
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    validateUpdateStatusInput(req);
    const { id, status } = req.body;
    // if (status === "admin") {
    //   throw new Error("Cannot set user status to 'admin'");
    // }
    // if (status === "teacher") {
    //   throw new Error("Cannot set user status to 'teacher'");
    //   }
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    user.status = status;
    await user.save();
    return res.status(200).json({ success: true, message: "User status updated successfully" });
  } catch (error) {
    console.error("Error updating user status:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    // if (!users) {
    //   throw new Error("No users found");
    // }
    return res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error getting all users:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error("Error getting user by id:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// validation for addUser
const validateAddUserInput = (req) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    throw new Error("All fields are required");
  }
};

// validation for editUser
const validateEditUserInput = (req) => {
  const { id, name, email, role } = req.body;
  if (!id || !name || !email || !role) {
    throw new Error("All fields are required");
  }
};

// validation for deleteUser
const validateDeleteUserInput = (req) => {
  const { id } = req.body;
  if (!id) {
    throw new Error("User ID is required");
  }
};

// validation for updateStatus
const validateUpdateStatusInput = (req) => {
  const { id, status } = req.body;
  if (!id || !status)
    {
    throw new Error("User ID and status are required");
  }
};