import courseModel from "@/models/Course";
import teacherModel from "@/models/Teacher";
import { connectToDb } from "@/utils/db";

const handler = async (req, res) => {
  connectToDb();
  switch (req.method) {
    case "POST": {
      try {
        const { title, price, teacher } = req.body;
        if (!title.trim() || title.length < 8) {
          return res
            .status(422)
            .json({ message: "دوره باید حداقل ۸ کاراکتر داشته باشد" });
        } else {
          const mainTeacher = await teacherModel.findOne({ _id: teacher });
          await courseModel.create({ title, price, teacher: mainTeacher });
          return res
            .status(201)
            .json({ message: "دوره موردنظر با موفقیت ساخته شده" });
        }
      } catch (err) {
        return res.status(500).json({ message: "Server Error" });
      }
    }
    case "GET": {
      try {
        if (req.query.q) {
          const { q } = req.query;
          const filteredCourses = await courseModel.find({
            title: { $regex: q },
          });
          return res.json({ data: filteredCourses });
        } else {
          const courses = await courseModel
            .find({}, "-__v")
            .populate("teacher", ["-__v", "-updatedAt"]);
          return res.json({ data: courses });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server error" });
      }
    }
  }
};

export default handler;
