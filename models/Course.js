import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
});

const courseModel = mongoose.models?.Course || mongoose.model("Course", schema);
export default courseModel;
