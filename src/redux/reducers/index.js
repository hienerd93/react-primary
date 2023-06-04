import { combineReducers } from "redux";
import courses from "./courseReducers";
import authors from "./authorReducers";
import apiCallInProgress from "./apiStatusReducers";

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  apiCallInProgress: apiCallInProgress,
});

export default rootReducer;
