import { connectToDb } from "@/utils/db";
import courseModel from "@/models/Course";
import { isValidObjectId } from "mongoose";

const handler = async (req, res) => {
  const { courseId } = req.query;
  if (isValidObjectId(courseId)) {
    connectToDb();
    switch (req.method) {
      case "DELETE": {
        try {
          await courseModel.findOneAndDelete({ _id: courseId });
          return res
            .status(202)
            .json({ message: "دوره موردنظر با موفقیت حذف شد" });
        } catch (err) {
          return res.status(500).json({ message: "Internal Server error" });
        }
      }
      case "PUT": {
        const { title } = req.body;
        try {
          const course = await courseModel.findOneAndUpdate(
            { _id: courseId },
            { title }
          );
          if (course) {
            return res.json({ message: "دوره مورد نظر با موفقیت ویرایش شد" });
          } else {
            return res.status(404).json({ message: "دوره مورد نظر یافت نشد" });
          }
        } catch (err) {
          return res.status(500).json({ message: "Internal Server error" });
        }
      }
    }
  } else {
    return res.status(422).json({ message: "course id is not valid" });
  }
};
export default handler;
