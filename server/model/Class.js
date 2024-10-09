import mongoose from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      default: null, // Null muna habang di ba naconnect yung user._id
      // required: true
    },
    students: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      default: [], // Null muna habang di ba naconnect yung user._id
       // required: true
    }],
    classCode: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    courseNumber: {
      type: String,
      required: true,
      trim: true
    },
    subject: {
      type: String,
      required: true,
      trim: true
    },
    academicYear: {
      type: String,
      required: true,
      trim: true // Example format: '2024-2025'
    },
    term: {
      type: String,
      required: true,
      enum: ["First", "Second", "Short"],
      trim: true
    },
    room: {
      type: String,
      required: true,
      trim: true
    },
    days: {
      type: [String],
      enum: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      required: true,
    },
    startTime: {
      type: String,
      required: true, 
      trim: true
    },
    endTime: {
      type: String,
      required: true, 
      trim: true
    },
  }, 
  { timestamps: true }
);

export const ClassModel = mongoose.model("class", ClassSchema);
