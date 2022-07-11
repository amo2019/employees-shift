import {
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEES_CHANGED,
  EMPLOYEES_CLEAR,
  EMPLOYEE_DELETED,
  EMPLOYEE_RESET,
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  phone: "",
  shift: "Monday",
  saved: false,
  deleted: false,
  loading: true,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEES_FETCH_SUCCESS:
      return { ...action.payload, loading: false };

    case EMPLOYEES_CHANGED:
      return action.payload;
    case EMPLOYEE_DELETED:
      return { ...state, deleted: true };
    case EMPLOYEES_CLEAR:
      return INITIAL_STATE;
    case EMPLOYEE_RESET:
      return { ...state, deleted: false };
    default:
      return state;
  }
};
