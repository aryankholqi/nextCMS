import mongoose from "mongoose";
import teacherModel, { schema as teacherSchema } from "./Teacher";
import commentModel from "./Comment";

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
      type: teacherSchema,
      required: true,
      ref: "Teacher",
    },
  },
  {
    timestamps: true,
  }
);

schema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});

const courseModel = mongoose.models?.Course || mongoose.model("Course", schema);
export default courseModel;
