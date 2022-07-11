import React, { Component, useRef } from "react";
import firebase from "firebase";
import { connect } from "react-redux";
import { Card, CardSection, Spinner } from "./common";
import {
  employeesFetch,
  emailChanged,
  passwordChanged,
  loginUser,
} from "../actions";
import { config } from "./utils/firebaseUtils";
import { CircularProgress } from "@material-ui/core";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: "",
      showPassword: false,
      type: "password",
      checked: false,
      errors: {
        flag1: false,
        flag2: false,
        email: "",
        password: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
    this.loginRef = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
    this.Checkbox = this.Checkbox.bind(this);
  }

  componentDidMount() {
    const { loggedin, loggedout, history, loginUser } = this.props;
    const localStor = localStorage.getItem("authPass");
    if (!loggedin && !loggedout && localStor) {
      try {
        if (!firebase.apps.length) {
          firebase.initializeApp(config);
        }
        const storedUser = JSON.parse(localStorage.getItem("authPass"));
        loginUser(storedUser);
        history.push("/employeelist");
      } catch (error) {
        console.error("error fetching user", error.message);
      }
    }
    this.emailRef.current.focus();
  }
  Checkbox = (props) => <input type="checkbox" {...props} />;

  handleCheckboxChange = (event) => {
    this.setState({ checked: event.target.checked });
    if (this.state.showPassword) {
      this.setState({ showPassword: false });
      this.setState({ type: "password" });
    } else {
      this.setState({ showPassword: true });
      this.setState({ type: "text" });
    }
  };

  focusTextInput() {
    this.emailRef.current.focus();
  }

  emailFieldKeyDown(e) {
    if (e.key === "Enter") {
      this.passwordRef.current.focus();
    }
  }
  passwordFieldKeyDown(e) {
    if (e.key === "Enter") {
      this.loginRef.current.focus();
    }
  }

  loginKeyDown(e) {
    this.onButtonClick();
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  onEmailChange(text) {
    this.props.emailChanged(text.target.value);
    text.preventDefault();
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text.target.value);
    text.preventDefault();
  }

  onButtonClick = () => {
    const { email, password, history } = this.props;

    const re = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (re.test(email) === false) {
      this.setState({
        ...this.state,
        errors: { flag1: true, email: "This email is invalid" },
      });
      setTimeout(() => {
        this.setState({
          ...this.state,
          errors: { flag1: false, email: "" },
        });
      }, 1000);
      return;
    } else {
      this.setState({
        ...this.state,
        errors: { flag1: false, email: "" },
      });
    }

    if (password.length < 1) {
      this.setState({
        ...this.state,
        errors: { flag2: true, password: "Password is required" },
      });
      setTimeout(() => {
        this.setState({
          ...this.state,
          errors: { flag2: false, password: "" },
        });
      }, 1000);
      return;
    } else {
      this.setState({
        ...this.state,
        errors: { flag2: false, password: "" },
      });
    }

    this.props.loginUser({ email, password });

    history.push("/employeelist");
  };

  renderButton(e) {
    e.preventDefault();
    if (this.props.loading) {
      return <Spinner size="large" />;
    }
    return <button onClick={this.onButtonClick.bind(this)}>Logx In</button>;
  }

  render() {
    const { email, password, error, loggedin } = this.props;
    const styles = {
      fontSize: 15,
      marginTop: "2px",
      paddingTop: "2px",
      color: "red",
      alignSelf: "center",
    };
    return (
      <div>
        {loggedin ? null : (
          <Card>
            <CardSection>
              <input
                ref={this.emailRef}
                onKeyDown={(e) => this.emailFieldKeyDown(e)}
                label="Email"
                placeholder="test@test.com"
                onChange={this.onEmailChange.bind(this)}
                value={email}
                type="email"
              />
              {this.state.errors.flag1 && (
                <label style={styles}>This email is invalid!</label>
              )}
            </CardSection>

            <CardSection>
              <input
                ref={this.passwordRef}
                onKeyDown={(e) => this.passwordFieldKeyDown(e)}
                label="Password"
                placeholder="password"
                onChange={this.onPasswordChange.bind(this)}
                value={password}
                type={this.state.type}
              />

              {this.state.errors.flag2 && (
                <label style={styles}>Password is required!</label>
              )}
            </CardSection>
            <label style={styles}>{error}</label>

            <CardSection>
              {this.props.loading ? (
                <CircularProgress />
              ) : (
                <button
                  ref={this.loginRef}
                  onKeyDown={(e) => this.loginKeyDown(e)}
                  className="green lighten-3 btn-flat white-text"
                  onClick={this.onButtonClick.bind(this)}
                >
                  Log In
                </button>
              )}
              <div style={{ padding: "25px", display: "inline-block" }}>
                <label>
                  <this.Checkbox
                    checked={this.state.checked}
                    onChange={this.handleCheckboxChange}
                  />
                  <span>Show/Hide Password</span>
                </label>
              </div>
            </CardSection>
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedin, loggedout } = auth;
  return { email, password, error, loading, loggedin, loggedout };
};

export default connect(mapStateToProps, {
  employeesFetch,
  emailChanged,
  passwordChanged,
  loginUser,
})(LoginForm);
