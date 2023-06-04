import * as types from "../actions/actionTypes";
import { apiCallInProgress } from "./initialState";

function actionsEndInSuccess(type) {
  return type.substring(type.length - 8) === "_SUCCESS";
}

export default function apiStatusReducer(state = apiCallInProgress, action) {
  if (action.type === types.BEGIN_API_CALL) {
    return state + 1;
  }

  // An action can be handled by multiple reducers
  if (
    action.type === types.API_CALL_ERROR ||
    actionsEndInSuccess(action.type)
  ) {
    return state - 1;
  }

  return state;
}
