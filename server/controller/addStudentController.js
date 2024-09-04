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

    if (existingId) {
      return res
        .status(400)
        .json({ success: false, message: "Id Number already exists" });
    }

    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);

    const responseData = {
      success: true,
      message: "Student created successfully",
      user: { ...newUser._doc },
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating user:", error);
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
