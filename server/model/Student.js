import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema(
  {
    idNumber: {
      type: Number,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    course: {
      type: String,
      trim: true,
    },
    year: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      default: "Present",
    },
    absencesDates: [
      {
        date: {
          type: Date,
        },
      },
    ],
  },
  { timestamps: true }
);

export const StudentModel = mongoose.model("student", StudentSchema);
