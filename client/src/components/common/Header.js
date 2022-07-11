import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../../actions";

class Header extends Component {
  renderContent() {
    switch (this.props.loggedin) {
      case null:
        return;
      case false:
        return (
          <li>
            <Link to="/loginform">Login With Email</Link>
          </li>
        );

      default:
        return (
          <li>
            <a
              href="#"
              onClick={() => {
                this.signOutUser();
              }}
            >
              Logout
            </a>
          </li>
        );
    }
  }

  signOutUser = () => {
    const { history } = this.props;
    this.props.logoutUser();
    history.push("/loginForm");
  };

  render() {
    return (
      <nav>
        <div className="nav-wrapper green lighten-3">
          <Link
            to={this.props.loggedin ? "/employeelist" : "/"}
            className=" left brand-logo"
            style={{ textShadow: "2px 2px 4px #000000" }}
          >
            Employees..
          </Link>
          <ul id="nav-mobile" className="right">
            {this.renderContent()}
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  const { loggedin } = state.auth;
  return { loggedin };
}

export default connect(mapStateToProps, { logoutUser })(Header);
