import mongoose from "mongoose";

const StudentSchema = new mongoose.Schema({
  idNumber: {
    type: Number,
    required: true,
    unique: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  course: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    required: true, 
    enum: ['Present', 'Absent'],
    default: "Present",
  },
  absencesDates: {
    type: [Date],
    required: true,
  },
});

export const StudentModel = mongoose.model("student", StudentSchema);
