import React from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Navigate } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class CoursesPage extends React.Component {
  // Legacy way
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     course: {
  //       title: "",
  //     },
  //   };
  //   this.handleChange = this.handleChange.bind(this);
  // }
  // handleChange(event) {
  //   const course = { ...this.state.course, title: event.target.value };
  //   this.setState({ course: course });
  // }

  // Class field
  state = {
    redirectToAddCoursePage: false,
  };

  // Arrow functions inherit the binding context of their enclosing scope
  handleChange = (event) => {
    const course = { ...this.state.course, title: event.target.value };
    this.setState({ course: course });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.dispatch(courseActions.createCourse(this.state.course));
    // this.props.createCourse(this.state.course);
    this.props.actions.createCourse(this.state.course);
  };

  componentDidMount() {
    const { courses, authors, actions } = this.props;
    if (courses.length === 0) {
      actions.loadCourses().catch((error) => {
        alert("Loading courses failed" + error);
      });
    }

    if (authors.length === 0) {
      actions.loadAuthors().catch((error) => {
        alert("Loading authors failed" + error);
      });
    }
  }

  // async/await uses promises in behind the scene. So they can interact
  handleDeleteCourse = async (course) => {
    toast.success("Course deleted!");
    try {
      await this.props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddCoursePage && <Navigate to="/course" />}
        <h2>Courses</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-course"
              onClick={() => this.setState({ redirectToAddCoursePage: true })}
            >
              Add Course
            </button>
            <CourseList
              courses={this.props.courses}
              onDeleteClick={this.handleDeleteCourse}
            />
          </>
        )}
      </>
    );
  }
}

// since we declared mapDispatchToProps, dispatch is no longer injected. Only the actions we declared in mapDispatchToProps are passed in
CoursesPage.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  // createCourse: PropTypes.func.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((course) => ({
            ...course,
            authorName: state.authors.find((a) => a.id === course.authorId)
              .name,
          })),
    authors: state.authors,
    loading: state.apiCallInProgress > 0,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
