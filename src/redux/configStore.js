import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import reduxImmutableStateInvariant from "redux-immutable-state-invariant";
import thunk from "redux-thunk";

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
