import Course from "@/components/templates/Search/Courses";
import courseModel from "@/models/Course";
import { connectToDb } from "@/utils/db";

const index = ({ courses }) => {
  return <Course courses={courses} />;
};

export default index;

export async function getServerSideProps(context) {
  const { query } = context;
  const { q } = query;
  connectToDb();
  const courses = await courseModel.find({ title: { $regex: q } });
  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses)),
    },
  };
}
