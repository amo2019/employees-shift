import React, { Component } from "react";
import { connect } from "react-redux";

import { Card, CardSection } from "./common";
import { Button } from "./controls/Button";
import {
  employeeUpdate,
  employeeSave,
  employeeDelete,
  employeeReset,
} from "../actions";
import EmployeeForm from "./EmployeeForm";
import ConfirmDialog from "./ConfirmDialog";
import Notification from "./Notification";

class EmployeeEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      message: {
        to: "",
        body: "",
      },
      notify: {
        isOpen: false,
        message: "",
        type: "",
      },

      title: "",
      subTitle: "",
      isOpen: false,

      submitting: false,
      error: false,
    };
    this.onTextEmployee = this.onTextEmployee.bind(this);
  }

  componentDidMount() {
    const employee = this.props.employee;

    for (var key in employee) {
      if (employee.hasOwnProperty(key)) {
        let prop = key;
        let value = employee[key];

        this.props.employeeUpdate({ prop, value });
      }
    }
  }

  onSaveChanges(props) {
    const { name, shift, phone } = this.props;
    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: this.props.uid,
    });

    const { history } = this.props;
    history.push("/employeelist");
  }

  onTextEmployee(event) {
    event.preventDefault();
    const { shift } = this.props;

    http: fetch("/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: "+4915167166905",
        body: `Your upcoming shift is on ${shift} (Your Team Manager)`,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          this.setState({
            error: false,
            submitting: false,
            message: {
              to: "+4915167166905",
              body: `Your upcoming shift is on ${shift} (Your Team Manager)`,
            },
          });
          this.setState({
            notify: {
              isOpen: true,
              message: "Massage sent Successfully",
              type: "success",
            },
          });

          console.log("MSM SUCCESS", this.state.message);
        } else {
          this.setState({
            error: true,
            submitting: false,
          });

          console.log("MSM FAILUR", this.state.message);
        }
      });
  }

  onDecline() {
    this.setState({ isOpen: false });
  }

  onAccept() {
    this.setState({ isOpen: false });

    const { history } = this.props;
    this.props.employeeDelete({ uid: this.props.uid });
    history.push("/employeelist");
  }

  showEmployees = () => {
    this.props.employeeSave();
  };

  render() {
    return (
      <Card>
         <EmployeeForm {...this.props.location.state} />
        <div style={{ padding: "25px", display: "flex" }}>
          <CardSection>
            <Button
              style={{
                backgroundColor: "#6dd19a",
              }}
              text="..Save Changes .."
              color="secondary"
              onClick={this.onSaveChanges.bind(this, this.props.location.state)}
            />
          </CardSection>

          <CardSection>
            <Button
              style={{
                backgroundColor: "#6dd19a",
              }}
              text="..Text Schedule .."
              color="secondary"
              onClick={this.onTextEmployee.bind(this)}
            />
          </CardSection>

          <CardSection>
            <Button
              style={{
                backgroundColor: "#f5718f",
              }}
              text="Deletet Employee"
              color="secondary"
              onClick={() => {
                this.setState({ isOpen: true });
                this.setState({
                  isOpen: true,
                  title: "Are you sure to delete this record?",
                  subTitle: "You can't undo this operation",
                });
              }}
            />
          </CardSection>
        </div>

        <ConfirmDialog
          isible={this.state.isOpen}
          onDecline={this.onDecline.bind(this)}
          confirmDialog={this.state}
          setConfirmDialog={this.onAccept.bind(this)}
        >
          Are you sure you want to delete this?
        </ConfirmDialog>
        {this.props.deleted ? (
          <Notification
            notify={this.props.deleted}
            message="Employee has been deleted Successfully"
            setNotify={() => this.props.employeeReset()}
          />
        ) : null}
        {this.state.notify.isOpen ? (
          <Notification
            notify={this.state.notify.isOpen}
            message={this.state.notify.message}
            setNotify={() =>
              this.setState({
                notify: {
                  isOpen: false,
                  message: "",
                  type: "",
                },
              })
            }
          />
        ) : null}
      </Card>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const { name, shift, phone, uid } = state.employeeForm;
  const { deleted } = state.employees;
  return { name, shift, phone, uid, deleted };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeSave,
  employeeDelete,

  employeeReset,
})(EmployeeEdit);
