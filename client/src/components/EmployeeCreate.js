import React, { Component } from "react";
import { connect } from "react-redux";
import firebase from "firebase";
import {
  employeeUpdate,
  employeeCreate,
  employeesFetch,
  employeeReset,
  employeeSaved,
} from "../actions";
import { Card, CardSection } from "./common";
import { Button } from "./controls/Button";
import EmployeeForm from "./EmployeeForm";
import Notification from "./Notification";

class EmployeeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notify: {
        isOpen: false,
        message: "",
        type: "",
      },
      errors: {
        flag: false,
        nameField: "",
      },
      INITIAL_STATE: {
        name: "",
        phone: "",
        shift: "Monday",
        saved: false,
        deleted: false,
        clean: true,
      },
    };
  }

  onButtonClick(e) {
    e.preventDefault();
    const { currentUser } = firebase.auth();
    if (currentUser) {
      const { name, phone, shift } = this.props;
      if (name.length < 1 || phone.length < 1) {
        this.setState({
          errors: {
            flag: true,
            nameField: name.length < 1 ? "Name" : "Phone",
          },
        });
        setTimeout(() => {
          this.setState({
            errors: { flag: false, nameField: "" },
          });
        }, 2000);
        return;
      } else {
        this.setState({
          ...this.state,
          errors: { flag: false, nameField: "" },
        });
      }
      this.props.employeeCreate({ name, phone, shift: shift || "Monday" });
      this.props.employeeSaved();

      this.setState({
        notify: {
          isOpen: true,
          message: "Submitted Successfully",
          type: "success",
        },
      });
    } else {
      console.log("currentUser is null");
    }
  }

  render() {
    return (
      <>
        <Card>
          <div>
            <EmployeeForm
              {...this.state.INITIAL_STATE}
              {...this.state.errors}
            /> 
            <CardSection>
              <Button
                style={{
                  backgroundColor: "#6dd19a",
                }}
                text="Add Employee"
                color="secondary"
                onClick={(e) => this.onButtonClick(e)}
              />
            </CardSection>
          </div>
        </Card>
        {this.props.saved ? (
          <Notification
            notify={this.props.saved}
            message={this.state.notify.message}
            setNotify={() => this.props.employeeReset()}
          />
        ) : null}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  const { loggedin } = state.auth;
  const { saved } = state.employeeForm;
  return { name, phone, shift, saved, loggedin };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeCreate,
  employeesFetch,
  employeeReset,
  employeeSaved,
})(EmployeeCreate);
