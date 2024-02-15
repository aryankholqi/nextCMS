import courseModel from "@/models/Course";
import { connectToDb } from "@/utils/db";

const handler = async (req, res) => {
  connectToDb();
  switch (req.method) {
    case "POST": {
      try {
        const { title } = req.body;
        if (!title.trim() || title.length < 8) {
          return res
            .status(422)
            .json({ message: "دوره باید حداقل ۸ کاراکتر داشته باشد" });
        } else {
          await courseModel.create({ title });
          return res
            .status(201)
            .json({ message: "دوره موردنظر با موفقیت ساخته شده" });
        }
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error" });
      }
    }
  }
};

export default handler;