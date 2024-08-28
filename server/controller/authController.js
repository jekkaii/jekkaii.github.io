import bycrpt from "bcrypt";
import { UserModel } from "../model/User.js";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
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

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new UserModel({ name, email, password: hashedPassword });

    await newUser.save();
    generateTokenAndSetCookie(res, newUser._id);

    const responseData = {
      success: true,
      message: "User created successfully",
      user: { ...newUser._doc, password: undefined },
    };

    res.status(201).json(responseData);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ success: false, message: error.message });
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
      res
        .status(404)
        .json({ success: false, message: "User credentials invalid" });
    }
    const checkPasswordMatch = await bycrpt.compare(password, user.password);

    // Check if password matches
    if (!checkPasswordMatch) {
      res
        .status(401)
        .json({ success: false, message: "Password is Incorrect" });
    }

    generateTokenAndSetCookie(res, user._id);
    user.lastLogin = new Date();
    await user.save();
    res.status(200).json({
      success: true,
      message: "Login Success",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    console.log("Post request failed", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  //   req.session.destroy((err) => {
  //     if (err) {
  //       res.status(500)({ error: "Failed to logout" });
  //     } else {
  //       // res.clearCookie('sid')
  //       console.log("Logged Out");
  //       res.status(200).json("Logout Success");
  //     }
  //   });
  res.clearCookie("authToken");
  res.clearCookie("connect.sid");
  res.status(200).json({ success: true, message: "Logout Success" });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).select("-password");
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res
      .status(200)
      .json({ success: true, user: { ...user._doc, password: undefined } });
  } catch (error) {
    console.log("Post request failed", error);
    res.status(400).json({ success: false, message: error.message });
  }
};
