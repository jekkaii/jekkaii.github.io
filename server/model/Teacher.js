import mongoose, { Schema } from "mongoose";

const TeacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  classes: [
    {
      type: Schema.Types.ObjectId,
      ref: "Class", // Reference to the Class schema
    },
  ],
});

export const TeacherModel = mongoose.model("Teacher", TeacherSchema);
