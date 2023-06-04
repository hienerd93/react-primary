import React from "react";
import { connect } from "react-redux";
import { loadCourses, saveCourse } from "../../redux/actions/courseActions";
import { loadAuthors } from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { useNavigate, useParams } from "react-router-dom";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageCoursesPage({
  courses,
  authors,
  loadAuthors,
  loadCourses,
  saveCourse,
}) {
  const { slug } = useParams();
  // Avoid using Redux for all state. Use plain React state for data only one few components use.(such as form state)
  const [course, setCourse] = React.useState(newCourse);
  const [errors, setErrors] = React.useState({});
  const [saving, setSaving] = React.useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (courses.length === 0) {
      loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }, []);

  React.useEffect(() => {
    if (courses.length > 0) {
      setCourse(slug ? getCourseBySlug(courses, slug) : newCourse);
    }
  }, [courses]);

  function handleChange(event) {
    const { name, value } = event.target;
    setCourse((preState) => ({
      ...preState,
      [name]: name === "authorId" ? parseInt(value, 10) : value,
    }));
  }

  // if your API built in Node, you can share your validation logic on client and server via npm
  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required.";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // Form is valid if the errors object still has no properties
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveCourse(course)
      .then(() => {
        toast.success("Course saved!");
        navigate("/courses");
      })
      .catch((error) => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return courses.length === 0 || authors.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    ></CourseForm>
  );
}

// since we declared mapDispatchToProps, dispatch is no longer injected. Only the actions we declared in mapDispatchToProps are passed in
ManageCoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  saveCourse: PropTypes.func.isRequired,
};

export function getCourseBySlug(courses, slug) {
  return courses.find((course) => course.slug === slug) || null;
}

function mapStateToProps(state) {
  return {
    courses: state.courses,
    authors: state.authors,
    course: state.course,
  };
}
const mapDispatchToProps = {
  loadCourses,
  loadAuthors,
  saveCourse,
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursesPage);
