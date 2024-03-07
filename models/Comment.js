import mongoose from "mongoose";

const schema = mongoose.Schema({
  body: {
    type: String,
    minLength: 2,
    maxLength: 150,
    required: true,
  },
  course: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "Course",
  },
});

const commentModel =
  mongoose.models?.Comment || mongoose.model("Comment", schema);

export default commentModel;
