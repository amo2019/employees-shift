import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEE_RESET,
  FORM_CLEAR,
} from "../actions/types";

const INITIAL_STATE = {
  name: "",
  phone: "",
  shift: "Monday",
  saved: false,
  deleted: false,
  clean: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMPLOYEE_UPDATE:
      return { ...state, [action.payload.prop]: action.payload.value };
    case EMPLOYEE_CREATE:
      return { ...INITIAL_STATE, saved: true };
    case EMPLOYEE_SAVE_SUCCESS:
      return { ...INITIAL_STATE, saved: true };
    case EMPLOYEE_RESET:
      return { ...state, saved: false };
    case FORM_CLEAR:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
