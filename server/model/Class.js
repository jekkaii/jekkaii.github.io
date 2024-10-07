import mongoose from "mongoose";

// Classes: Classcode, subject, time, room, schedule,  academicYear, term/
// KULANG: course number
const ClassSchema = new mongoose.Schema({
  teacher: [{ // VALIDATE THAT THE USER IS A TEACHER
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
  }],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
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
  time: {
    type: String,
    required: true, 
    trim: true // Example format: '09:00 AM - 10:00 AM'
  },
  room: {
    type: String,
    required: true,
    trim: true
  },
  schedule: {
    type: [String],
    required: true
  },
  academicYear: {
    type: String,
    required: true,
    trim: true // Example format: '2024-2025'
  },
  term: {
    type: String,
    required: true,
    enum: ['First', 'Second', 'Short'],
    trim: true
  }
});

export const ClassModel = mongoose.model("class", ClassSchema);
