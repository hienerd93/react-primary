import React from "react";
import HomePage from "./components/home/HomePage";
import AboutPage from "./components/about/AboutPage";
import PageNotFound from "./components/PageNotFound";
import CoursesPage from "./components/courses/CoursesPage";
import App from "./components/App";
import { createBrowserRouter } from "react-router-dom";
import ManageCoursePage from "./components/courses/ManageCoursePage";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <PageNotFound />,
        path: "*",
      },
      {
        element: <HomePage />,
        index: true,
      },
      {
        element: <CoursesPage />,
        path: "courses",
      },
      {
        element: <ManageCoursePage />,
        path: "course",
        children: [
          {
            element: <ManageCoursePage />,
            path: ":slug",
          },
        ],
      },
      {
        path: "about",
        element: <AboutPage />,
      },
    ],
  },
]);

export default routes;
