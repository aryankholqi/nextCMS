import { connectToDb } from "@/utils/db";
import teacherModel from "@/models/Teacher";

const handler = async (req, res) => {
  connectToDb();
  switch (req.method) {
    case "GET": {
      try {
        const teachersList = await teacherModel.find();
        return res.json({ data: teachersList });
      } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
    case "POST": {
      try {
        const { name } = req.body;
        if (!Boolean(name) || name.length < 2 || name.length > 50) {
          return res
            .status(422)
            .json({ message: "نام وارد شده صحیح نمی باشد" });
        } else {
          await teacherModel.create({ name });
          return res
            .status(201)
            .json({ message: "استاد موردنظر با موفقیت اضافه شد" });
        }
      } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
};

export default handler;
