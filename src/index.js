import React from "react";
import { createRoot } from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import configStore from "./redux/configStore";
import { Provider as ReduxProvider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import routes from "./routes";

// useful to pass initial state into the store here if you're server rendering or initialize your Redux store from localStorage
const store = configStore();

createRoot(document.getElementById("app")).render(
  <ReduxProvider store={store}>
    <RouterProvider router={routes} />
  </ReduxProvider>
);
