import mongoose, { Schema } from "mongoose";

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
      enum: ["Admin", "Teacher"],
      required: true,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    // Teacher-specific fields
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "Class", // Reference to the Class schema
      },
    ],
    department: {
      type: String,
    },
    adminInfo: {
      adminLevel: Number,
    },
    status: {
      type: String,
    }
  },
  { timestamps: true }
);

UserSchema.pre("save", function (next) {
  if (this.role === "Teacher") {
    this.adminInfo = undefined; // Remove admin-specific fields if role is Teacher
  } else if (this.role === "Admin") {
    this.classes = undefined; // Remove teacher-specific fields if role is Admin
    this.department = undefined;
  }
  next();
});

// Teachers, students, Classes,
// Classes: Classcode, time, room, schedule, subject, academicYear, term

export const UserModel = mongoose.model("User", UserSchema);
