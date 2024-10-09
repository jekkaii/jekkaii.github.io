import bcrypt from "bcryptjs";
import { UserModel } from "../model/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, role, password } = req.body;

    if (!firstName || !lastName || !email || !password || !role) {
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
    const username = email.substring(0, email.indexOf("@"));
    bycrpt.getSalt(10, (err, salt) => {
      if (err) {
        return res
          .status(500)
          .json({ success: false, message: "Internal server error" });
      }
      bycrpt.hash(password, salt, async (err, hashedPassword) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, message: "Internal server error" });
        }
      });
    });

    const hashedPassword = bcrypt.hashSync(password, 12);
    const newUser = new UserModel({
      firstName,
      lastName,
      username,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);

    const responseData = {
      success: true,
      message: "User created successfully",
      user: { ...newUser._doc, password: undefined },
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating user:", error);
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

