import bcrypt from "bcrypt";
import { UserModel } from "../model/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const getUsers = async (req, res) => {
  try {
    // Fetch all students from the database
    const users = await UserModel.find();

    // Check if there are any students
    if (!users) {
      return res.status(404).json({
        success: false,
        message: "No users found",
      });
    }
    // Return the students as a JSON response
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const addUser = async (req, res) => {
  try {
    validateAddUserInput(req);
    const { name, email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
      role,
    });
    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);
    return res
      .status(201)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const editUser = async (req, res) => {
  try {
    validateEditUserInput(req); // Validate input as per your existing logic
    const { username: id, firstname, lastname, email, department } = req.body; // Extract values from req.body
    const user = await UserModel.findOne({ username: id });

    if (!user) {
      throw new Error("User not found");
    }

    const checkUserDepartment = await UserModel.findOne({
      department: department,
    });

    // Update user properties
    user.firstName = firstname;
    user.lastName = lastname;
    user.email = email; // Update email

    if (checkUserDepartment) {
      user.department = department;
    }

    // Check if a new photo is uploaded and update the photo field

    if (req.file) {
      user.photo = req.file.path; // Set the user's photo to the uploaded file's path
    }

    await user.save(); // Save the updated user
    return res
      .status(200)
      .json({ success: true, message: "User updated successfully", user });
  } catch (error) {
    console.error("Error editing user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    await UserModel.findByIdAndDelete(userId);
    return res
      .status(200)
      .json({ success: true, message: "User account deleted" });
  } catch (error) {
    console.log("Error deleting user", error);
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
    return res
      .status(200)
      .json({ success: true, message: "User status updated successfully" });
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

// userController.js
export const activateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.status = "activated";
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User account activated" });
  } catch (error) {
    console.log("Error activating user", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    user.status = "deactivated";
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User account deactivated" });
  } catch (error) {
    console.log("Error deactivating user", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// adminController.js
export const updateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    const { name, email, role, status } = req.body;
    user.name = name;
    user.email = email;
    user.role = role;
    user.status = status;
    await user.save();
    return res
      .status(200)
      .json({ success: true, message: "User updated successfully" });
  } catch (error) {
    console.log("Error updating user", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// validation for addUser
const validateAddUserInput = (req) => {
  const { name, email, password, role, status } = req.body;
  if (!name || !email || !password || !role || status) {
    throw new Error("All fields are required");
  }
};

// validation for editUser
const validateEditUserInput = (req) => {
  const { username: id, firstname, lastname, email } = req.body;
  if (!id || !firstname || !lastname || !email) {
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
  if (!id || !status) {
    throw new Error("User ID and status are required");
  }
};
