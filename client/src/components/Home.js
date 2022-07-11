import React, { Component, Suspense, lazy } from "react";
const LoginForm = lazy(() => import('./LoginForm'));
//import LoginForm from "./LoginForm";
import { connect } from "react-redux";
import { CardSection } from "./common";
import { emailChanged, passwordChanged, loginUser } from "../actions";

class Home extends Component {
  constructor(props) {
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data) {
    this.props.handleLogin(data);
    this.props.history.push("/employeelist");
  }

  handleLogoutClick() {
    this.props.handleLogout();
    this.props.history.push("/loginform");
  }

  render() {
    const { loggedin } = this.props;
    return (
      <CardSection>
        {loggedin ? (
          <div>
            <h1>Home</h1>
            <h1>Status: {loggedin}</h1>
            <button onClick={() => this.handleLogoutClick()}>Logout</button>

            {/* <LoginForm handleSuccessfulAuth={this.handleSuccessfulAuth} /> */}
          </div>
        ) : (
          <Suspense fallback={<div>Loading...</div>}> <LoginForm
            {...this.props}
            handleSuccessfulAuth={this.handleSuccessfulAuth}
          /> </Suspense>
        )}
      </CardSection>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedin } = auth;
  return { email, password, error, loading, loggedin };
};

export default connect(mapStateToProps, {
  emailChanged,
  passwordChanged,
  loginUser,
})(Home);
