import React, { Component, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import firebase from "firebase";
import Header from "./components/common/Header";
import PrivateRoute from "./components/common/PrivateRoute";
import { loginUser } from "./actions";
import routes from "./components/routes";
import Spinner from "./spinner/Spinner";

import LoginForm from "./components/LoginForm";

import Landing from "./components/Landing";
import { config } from "./components/utils/firebaseUtils";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggedIn: false,
      user: {},
    };

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    this.setState({
      loggedin: false,
      user: {},
    });
  }

  handleLogin(data) {
    this.setState({
      loggedin: true,
      user: data,
    });
  }

  componentDidMount() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  render() {
    return (
     
      <div className="app">
       
        <Router>
          <div>
            <Route
              render={(props) => (
                <Header
                  {...props}
                  loggedin={this.state.loggedin}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
                exact
                path={"/loginform"}
                render={(props) => (
                  <LoginForm
                    {...props}
                  />
                )}
              />
            <Suspense fallback={<Spinner />}>
            <Switch>
              <Route exact path={"/"} render={(props) => <Landing />} />
              {routes.map(({path, Component}, i) => (
                  <PrivateRoute 
                    key={i}
                    exact
                    path={path}
                    component={Component} 
                  />
                  ))}
            </Switch>
            </Suspense>
          </div>
        </Router>
      </div>
      
    );
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading, loggedin } = auth;
  return { email, password, error, loading, loggedin };
};

export default connect(mapStateToProps, { loginUser })(App);
