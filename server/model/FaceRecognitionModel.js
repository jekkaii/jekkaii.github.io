import mongoose from "mongoose";

const FaceRecognitionSchema = new mongoose.Schema(
  {
    model_name: {
      type: String,
      required: true,
      trim: true,
    },
    accuracy: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
  },
  { timestamps: true }
);

export const FaceRecognitionModel = mongoose.model("FaceRecognitionModel", FaceRecognitionSchema);