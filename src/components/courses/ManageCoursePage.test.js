import React from "react";
import { fireEvent, render } from "@testing-library/react";
import { authors, newCourse, courses } from "../../../tools/mockData";
import { ManageCoursesPage } from "./ManageCoursePage";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

function renderPage(args) {
  const defaultProps = {
    authors,
    courses,
    saveCourse: jest.fn(),
    loadAuthors: jest.fn(),
    loadCourses: jest.fn(),
    course: newCourse,
    match: {},
  };

  const props = { ...defaultProps, ...args };

  return render(
    <BrowserRouter>
      <ManageCoursesPage {...props} />
    </BrowserRouter>
  );
}

it("sets error when attempting to save an empty title field", () => {
  const wrapper = renderPage();
  const form = wrapper.getByRole("form", { name: "" });
  fireEvent.submit(form);
  expect(wrapper.getByText("Title is required.")).toBeInTheDocument();
});
