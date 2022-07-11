import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import { reducer as reduxForm } from "redux-form";
import EmployeeFormReducer from "./EmployeeFormReducer";
import EmployeeReducer from "./EmployeeReducer";

export default combineReducers({
  auth: AuthReducer,
  form: reduxForm,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer,
});
