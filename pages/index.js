import Course from "@/components/templates/index/Course";
import courseModel from "@/models/Course";
import model from "@/models/Course";
import { connectToDb } from "@/utils/db";

const index = ({ courses }) => {
  return <Course courses={courses}/>;
};

export default index;

export async function getStaticProps() {
  connectToDb();
  const courses = await courseModel.find();
  return {
    props: {
      courses: JSON.parse(JSON.stringify(courses)),
    },
    revalidate: 60 * 60 * 12,
  };
}
