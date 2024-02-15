import CoursesItem from "@/components/modules/coursesItem/CoursesItem";
import { useEffect, useState } from "react";
import AddCourseModal from "./AddCourseModal";
import styles from "@/styles/Course.module.css";

const Course = ({ courses }) => {
  const [showAddCourseModal, setShowAddCourseModal] = useState(false);

  const hideAddCourseModal = () => setShowAddCourseModal(false);

  const [data, setData] = useState([...courses]);

  const getCourses = async () => {
    const res = await fetch("/api/courses");
    const coursesData = await res.json();
    if (res.status === 200) {
      setData(coursesData.data);
    }
  };

  return (
    <>
      <section className={styles.courses}>
        <div className={styles.courses_top}>
          <h2 className={styles.courses_title}>دوره ها</h2>
          <a
            href="#"
            className={styles.new_course_btn}
            onClick={() => setShowAddCourseModal(true)}
          >
            اضافه کردن دوره جدید
          </a>
        </div>
        <ul className={styles.courses_list}>
          {data.map((course, index) => (
            <CoursesItem {...course} key={index} />
          ))}
        </ul>
      </section>

      {showAddCourseModal && (
        <AddCourseModal
          hideAddCourseModal={hideAddCourseModal}
          refetchCourses={getCourses}
        />
      )}
    </>
  );
};

export default Course;
