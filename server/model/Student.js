import mongoose from "mongoose";
import { ClassModel } from "./Class.js";

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
          type: [Date],
        },
      },
    ],
  },
  { timestamps: true }
);

StudentSchema.pre("findOneAndDelete", async function (next) {
  try {
    const student = await this.model.findOne(this.getFilter());

    // Assuming you pass the classId as part of the query
    const { classId } = this.getQuery();

    // If student and classId are provided, remove the student from the specific class
    if (student && classId) {
      await ClassModel.updateOne(
        { _id: classId, students: student._id }, // Find the specific class containing the student
        { $pull: { students: student._id } } // Remove the student's ObjectId from the students array of the specific class
      );
    }

    next();
  } catch (error) {
    next(error);
  }
});

export const StudentModel = mongoose.model("Student", StudentSchema);
