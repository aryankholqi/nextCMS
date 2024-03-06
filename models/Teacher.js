import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 50,
    },
  },
  {
    timestamps: true,
  }
);

const teacherModel =
  mongoose.models?.Teacher || mongoose.model("Teacher", schema);

export default teacherModel;
