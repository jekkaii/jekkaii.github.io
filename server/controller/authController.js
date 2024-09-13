import bycrpt from "bcrypt";
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
    const hashedPassword = await bycrpt.hash(password, 12);
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
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("All fields are required");
    }
    const user = await UserModel.findOne({ email });
    // Check if user exists
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User credentials invalid" });
    }
    const checkPasswordMatch = await bycrpt.compare(password, user.password);

    // Check if password matches
    if (!checkPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Password is Incorrect" });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    console.log(`User ${user.name} logged in`);
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
    const user = await UserModel.findById(req.userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    return res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.log("Post request failed", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
