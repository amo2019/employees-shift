import firebase from "firebase";
import {
  EMPLOYEE_UPDATE,
  EMPLOYEE_CREATE,
  EMPLOYEES_FETCH_SUCCESS,
  EMPLOYEE_SAVE_SUCCESS,
  EMPLOYEES_CLEAR,
  EMPLOYEE_RESET,
  EMPLOYEE_DELETED,
  FORM_CLEAR,
} from "./types";

export const employeeUpdate = ({ prop, value }) => {
  return { type: EMPLOYEE_UPDATE, payload: { prop, value } };
};

export const employeeClear = () => {
  return (dispatch) => {
    dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
  };
};

export const formClear = () => {
  return { type: FORM_CLEAR };
};

export const employeesClear = () => {
  return { type: EMPLOYEES_CLEAR };
};

export const employeeReset = () => {
  return { type: EMPLOYEE_RESET };
};
export const employeeSaved = () => {
  return { type: EMPLOYEE_SAVE_SUCCESS };
};

export const employeeCreate = ({ name, phone, shift }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .push({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_CREATE });
      });
  };
};

export const employeesFetch = () => {
  const { currentUser } = firebase.auth();
  return (dispath) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees`)
      .on("value", (snapshot) => {
        dispath({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
      });
  };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .set({ name, phone, shift })
      .then(() => {
        dispatch({ type: EMPLOYEE_SAVE_SUCCESS });
      });
  };
};

export const employeeDelete = ({ uid }) => {
  const { currentUser } = firebase.auth();
  return (dispatch) => {
    firebase
      .database()
      .ref(`/users/${currentUser.uid}/employees/${uid}`)
      .remove()
      .then(() => {
        dispatch({ type: EMPLOYEE_DELETED });
      });
  };
};
