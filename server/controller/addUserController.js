import bycrpt from "bcrypt";
import { UserModel } from "../model/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const addUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
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

    const hashedPassword = await bycrpt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashedPassword });

    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);

    const responseData = {
      success: true,
      message: "User created successfully",
      user: { ...newUser._doc },
    };

    return res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(400).json({ success: false, message: error.message });
  }
};
