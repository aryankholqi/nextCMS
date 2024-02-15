import CoursesItem from "@/components/modules/coursesItem/CoursesItem";
import styles from "@/styles/Course.module.css";

const Course = ({ courses }) => {
  return (
    <>
      <section className={styles.courses}>
        <div className={styles.courses_top}>
          <h2 className={styles.courses_title}>نتیجه جستجو</h2>
        </div>
        <ul className={styles.courses_list}>
          {courses.map((course, index) => (
            <CoursesItem {...course} key={index} />
          ))}
        </ul>
      </section>
    </>
  );
};

export default Course;
