import DeleteModal from "@/components/templates/index/DeleteModal";
import EditModal from "@/components/templates/index/EditModal";
import { useState } from "react";
import styles from "@/styles/Course.module.css";
import swal from "sweetalert";
const CoursesItem = ({ title, _id }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const hideEditModal = () => setShowEditModal(false);
  const hideDeleteModal = () => setShowDeleteModal(false);

  const removeCourse = async () => {
    const res = await fetch(`/api/courses/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.status === 202) {
      hideDeleteModal();
      swal({
        title: "دوره مورد نظر با موفقیت حذف شد",
        icon: "success",
      });
    }
  };

  const updateCourse = async (event, title) => {
    event.preventDefault();
    const res = await fetch(`/api/courses/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    if (res.status === 200) {
      swal({
        title: "دوره مورد نظر با موفقیت ویرایش شد",
        icon: "success",
      });
      hideEditModal();
    }
  };
  return (
    <>
      <li className={styles.courses_item}>
        <div className={styles.courses_img_title}>
          <img
            src={"/images/courses/js.png"}
            alt="course-item-img"
            className={styles.courses_img}
          />
          <h5 className={styles.courses_name}>{title}</h5>
        </div>
        <div className={styles.courses_btns}>
          <a
            href="#"
            className={styles.courses_btn_edit}
            onClick={() => setShowEditModal(true)}
          >
            {" "}
            ویرایش{" "}
          </a>
          <a
            href="#"
            className={styles.courses_btn_delete}
            onClick={() => setShowDeleteModal(true)}
          >
            {" "}
            حذف{" "}
          </a>
        </div>
      </li>
      {showEditModal && (
        <EditModal hideEditModal={hideEditModal} updateHandler={updateCourse} />
      )}
      {showDeleteModal && (
        <DeleteModal
          hideDeleteModal={hideDeleteModal}
          removeHandler={removeCourse}
        />
      )}
    </>
  );
};

export default CoursesItem;
