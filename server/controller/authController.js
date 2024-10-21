import bcrypt from "bcryptjs";
import { UserModel } from "../model/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signupTeacher = async (req, res) => {
  try {
    const { firstName, lastName, email, password, department } = req.body;

    if (!firstName || !lastName || !email || !password || !department) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    var salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newTeacher = new UserModel({
      firstName,
      lastName,
      email,
      username: email.substring(0, email.indexOf("@")),
      password: hashedPassword,
      role: "Teacher",
      lastLogin: Date.now(),
      department,
      classes: [],
    });

    await newTeacher.save();
    generateTokenAndSetCookie(res, newTeacher._id);

    const responseData = {
      success: true,
      message: "Teacher created successfully",
      user: { ...newTeacher._doc, password: undefined },
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating teacher:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const signupAdmin = async (req, res) => {
  try {
    const { firstName, lastName, email, password, adminLevel } = req.body;

    if (!firstName || !lastName || !email || !password || !adminLevel) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    var salt = bcrypt.genSaltSync(10);

    const hashedPassword = bcrypt.hashSync(password, salt);

    const newAdmin = new UserModel({
      firstName,
      lastName,
      email,
      username: email.substring(0, email.indexOf("@")),
      password: hashedPassword,
      role: "Admin",
      lastLogin: Date.now(),
      adminInfo: {
        adminLevel,
      },
    });

    await newAdmin.save();
    generateTokenAndSetCookie(res, newAdmin._id);

    const responseData = {
      success: true,
      message: "Admin created successfully",
      user: { ...newAdmin._doc, password: undefined },
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating admin:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      throw new Error("All fields are required");
    }
    const user = await UserModel.findOne({ username });
    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User credentials invalid" });
    }
    // Check if user's status is activated
    if (user.status !== "activated") {
      return res
        .status(401)
        .json({ success: false, message: "User account is deactivated. Please contact admin to activate your account." });
    }
    const checkPasswordMatch = bcrypt.compareSync(password, user.password);

    // Check if password matches
    if (!checkPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password is Incorrect" });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    console.log(`User ${user.username} logged in`);
    return res.status(200).json({
      success: true,
      message: "Login Success",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Post request failed", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("authToken");
    return res.status(200).json({ success: true, message: "Logout Success" });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId }).select(
      "-password"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Auth Success", user });
  } catch (error) {
    console.log("Post request failed", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
export const checkAdmin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ _id: req.userId }).select(
      "-password"
    );
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.role !== "admin") {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized Access" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Admin Access", user });
  } catch (error) {
    console.log("Post request failed", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};

// const jwt = require('jsonwebtoken');

// // Middleware to authenticate and retrieve user ID from JWT
// export const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token || req.header('Authorization').replace('Bearer ', '');

//   if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.id; // Attach the user ID to the request object
//     next();
//   } catch (err) {
//     res.status(400).json({ message: 'Invalid token.' });
//   }
// };
