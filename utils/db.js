import mongoose from "mongoose";
export const connectToDb = async () => {
  try {
    if (mongoose.connections[0].readyState) {
      return false;
    } else {
      await mongoose.connect("mongodb://localhost:27017/next-cms");
      console.log("Connect to db successfully");
    }
  } catch (err) {
    console.log("Db connection error:", err);
  }
};
