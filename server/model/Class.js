import mongoose, { Schema } from "mongoose";

const ClassSchema = new mongoose.Schema(
  {
    classCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    courseNumber: {
      type: String,
      required: true,
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    academicYear: {
      type: String,
      required: true,
      trim: true, // Example format: '2024-2025'
    },
    term: {
      type: String,
      required: true,
      enum: ["First", "Second", "Short"],
      trim: true,
    },
    room: {
      type: String,
      required: true,
      trim: true,
    },
    days: {
      type: [String],
      enum: ["M", "T", "W", "Th", "F", "S"],
      required: true,
    },
    startTime: {
      type: String,
      required: true,
      trim: true,
    },
    endTime: {
      type: String,
      required: true,
      trim: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student", // Referencing StudentModel
      },
    ],
  },
  { timestamps: true }
);

export const ClassModel = mongoose.model("Class", ClassSchema);
