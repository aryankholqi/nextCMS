import mongoose from "mongoose";
import teacherModel from "./Teacher";

const schema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
      index: true,
      // match:
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
      max: 5000000,
    },
    teacher: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

const courseModel = mongoose.models?.Course || mongoose.model("Course", schema);
export default courseModel;
