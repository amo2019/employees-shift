import React from "react";
import { connect, useSelector } from "react-redux";
import { Route } from "react-router-dom";
import LoginForm from "../LoginForm";

export default function PrivateRoute({
  component: Component,
  prevLocation,
  ...rest
}) {
  const { loggedin } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        loggedin ? <Component {...props} /> : <LoginForm {...props} />
      }
    />
  );
}

/* const mapStateToProps = ({ auth }) => {
  const { loggedin } = auth;
  return { loggedin };
};

 connect(mapStateToProps)(PrivateRoute); */
