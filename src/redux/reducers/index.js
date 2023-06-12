import { combineReducers } from "redux";
import courses from "./courseReducers";
import authors from "./authorReducers";
import apiCallInProgress from "./apiStatusReducers";

// const combineReducersScratch = (reducers) => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// };

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  apiCallInProgress: apiCallInProgress,
});

export default rootReducer;
