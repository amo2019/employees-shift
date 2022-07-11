import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  LOGOUT_USER,
} from "../actions/types";

const INITIAL_STATE = {
  email: "",
  password: "",
  user: null,
  error: "",
  loading: false,
  loggedin: false,
  loggedout: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload };

    case PASSWORD_CHANGED:
      return { ...state, password: action.payload };

    case LOGIN_USER_SUCCESS:
      const authStorage = { email: state.email, password: state.password };

      if (!localStorage.getItem("authPass")) {
        localStorage.setItem("authPass", JSON.stringify(authStorage));
      }
      return {
        ...state,
        ...INITIAL_STATE,
        user: action.payload,
        loggedin: true,
      };

    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: "Authentication Failed",
        password: "",
        loading: false,
        loggedin: false,
      };

    case LOGOUT_USER:
      return {
        ...state,
        ...INITIAL_STATE,
        loggedout: true,
      };

    case LOGIN_USER:
      return { ...state, error: "", loading: true };
    default:
      return state;
  }
};
