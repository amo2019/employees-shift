import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { employeesFetch, logoutUser } from "../actions";
import { Card } from "./common";
const ListItem = lazy(() => import('./ListItem'));
//import ListItem from "./ListItem";
import { Link } from "react-router-dom";
import Spinner from "../spinner/Spinner";
class EmployeeList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      shift: "Monday",
      saved: false,
      deleted: false,
      clean: true,
    };
  }

  componentDidMount() {}
  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  signOutUser() {
    const { history } = this.props;
    this.props.logoutUser();
    history.push("/loginForm");
  }

  render() {
    return (
      <Card>
        <div>
          <Card>
            {this.props.employees ? <Suspense fallback={< Spinner />}><ListItem {...this.props} /> </Suspense> : null}
          </Card>
          <div className="fixed-action-btn">
            <Link to="/employeecreate">
              <i className="btn-floating btn-large waves-effect waves-light green lighten-2">
                <i className="material-icons">add</i>
              </i>
            </Link>
          </div>
        </div>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  const employees = Object.keys(state.employees).map((key) => {
    return {
      key,
      ...state.employees[key],
    };
  });
  const { loggedin } = state.auth;
  return { employees, loggedin };
};
export default connect(mapStateToProps, { employeesFetch, logoutUser })(
  EmployeeList
);
