import mongoose from "mongoose";

// Mongoose model for database
const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "teacher"],
      default: "teacher",
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Teachers, students, Classes,
// Classes: Classcode, time, room, schedule, subject, academicYear, term

export const UserModel = mongoose.model("user", UserSchema);
