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
      default: "inactive",
    },
    model_filepath: {
      type: String,
      required: true,
      trim: true,
    },
    encoder_filepath: {
      type: String,
      required: true,
      trim: true,
    },
    date_created: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const FaceRecognitionModel = mongoose.model("FaceRecognitionModel", FaceRecognitionSchema);