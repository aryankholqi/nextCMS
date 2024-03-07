import courseModel from "@/models/Course";

const { default: commentModel } = require("@/models/Comment");

const handler = async (req, res) => {
  switch (req.method) {
    case "GET": {
      try {
        const comments = await commentModel
          .find({}, "-__v")
          .populate("course", "-__v");
        return res.json({ data: comments });
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Internal Server error", error: err });
      }
    }
    case "POST": {
      try {
        const { body, course } = req.body;
        if (!body.trim() || body.length < 2 || body.length > 150) {
          return res
            .status(422)
            .json({ message: "متن کامنت وارد شده صحیح نیست" });
        } else if (!course.trim()) {
          return res
            .status(422)
            .json({ message: "وارد کردن آیدی دوره اجباری است" });
        } else {
          const mainCourse = await courseModel.findOne({ _id: course });
          if (mainCourse) {
            await commentModel.create({ body, course: mainCourse });
            return res
              .status(201)
              .json({ message: "کامنت موردنظر با موفقیت ساخته شد" });
          } else {
            return res.status(400).json({ message: "دوره مورد نظر یافت نشد" });
          }
        }
      } catch (err) {
        return res
          .status(500)
          .json({ message: "Internal Server error", error: err });
      }
    }
  }
};

export default handler;
