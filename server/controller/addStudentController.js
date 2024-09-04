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
