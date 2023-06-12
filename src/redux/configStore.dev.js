import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

// const createStoreScratch = (reducer) => {
//   let state;
//   let listeners = [];

//   const getState = () => state;
//   const dispatch = (action) => {
//     state = reducer(state, action);
//     listeners.forEach((listener) => listener());
//   };
//   const subscrible = (listener) => {
//     listeners.push(listener);
//     return () => {
//       listeners = listeners.filter((l) => l !== listener);
//     };
//   };

//   dispatch({});

//   return { getState, dispatch, subscrible };
// };

export default function configStore(initState) {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux devtool
  return createStore(
    rootReducer,
    initState,
    // Redux middleware is a way to enhance Redux's behavior
    composeEnhancers(applyMiddleware(thunk, reduxImmutableStateInvariant()))
  );
}
