import React, { Component } from "react";
import firebase from "firebase";

import { CircularProgress } from "@material-ui/core";
import { connect } from "react-redux";
import { SearchBox } from "./SearchBox";
import ConfirmDialog from "./ConfirmDialog";
import Notification from "./Notification";
import {
  employeesFetch,
  employeeClear,
  employeesClear,
  employeeDelete,
  employeeReset,
} from "../actions";
import AddIcon from "@material-ui/icons/Add";
 import CloseIcon from "@material-ui/icons/Close";
 import Controls from "./controls/Controls";

class ListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,

      title: "",
      subTitle: "",
      isOpen: false,

      submitting: false,
      error: false,
    };
    this.searchRef = React.createRef();
    this.state = { list: [] };
  }
  componentDidMount() {
    const { currentUser } = firebase.auth();
    const fetchData = () => {
      firebase
        .database()
        .ref(`/users/${currentUser.uid}/employees`)
        .on("value", async (snapshot) => {
          const data = await snapshot.val();
        if(data){
          const employeesSearch = Object.keys(data).map((uid) => {
            return {
              uid,
              ...data[uid], 
            };
          });
          this.setState({ list: [...employeesSearch] });
        }
        });
    };
    fetchData();
    this.props.employeesFetch();
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  onDecline() {
    this.setState({
      isOpen: false,
      title: "",
      subTitle: "",
    });
  }

  onAccept() {
    this.setState({ isOpen: false });
    this.props.employeeDelete({ uid: this.state.uid });
  }

  onEmployeeSelect(employee) {
    this.props.history.push(
      "/employeeedit",
      { employee: employee },
      { clear: false }
    );
  }

  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve);
    });
  }

  filterEmployees = async (searchField) => {
    const { employees } = this.props;
    this.setState({ list: [...employees] });
    let list = employees.filter((employee) => {
      if (employee.name)
        return employee.name.toLowerCase().includes(searchField.toLowerCase());
    });

    this.setState({ list: [...list] });
  };

  onSearchChange = (event) => this.filterEmployees(event.target.value);

  renderSurveys() {
    return this.state.list.reverse().map((employee) => {
      const generateKey = (title) => {
        return `${Math.floor(Math.random() * 40)} + ${Math.floor(
          Math.random() * 50
        )} + ${Math.floor(Math.random() * 50)}`;
      };

      return (
        <div
          key={generateKey(employee.name)}
          className="row"
          style={{
            margin: 5,
          }}
        >
          <div className="card   green lighten-5" key={employee.name}>
            <div
              className="card-title"
              style={{
                display: "flex",
                flexDirection: "row",
                flex: 1,
                flexWrap: "nowrap",
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  marginLeft: "5px",
                }}
                onClick={this.onEmployeeSelect.bind(this, employee)}
              >
                {employee.name}
              </span>
              <div>
                <Controls.Button
                  text="Edit"
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={this.onEmployeeSelect.bind(this, employee)}
                />
                <Controls.Button
                  text="Delete"
                  variant="outlined"
                  startIcon={<CloseIcon />}
                  onClick={() => {
                    this.onAccept.bind(this, { uid: employee.uid });
                    this.setState({ uid: employee.uid });
                    this.setState({ isOpen: true });
                    this.setState({
                      isOpen: true,
                      title: `Are you sure to delete "${employee.name}" record?`,
                      subTitle: "You can't undo this operation",
                    });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const styleObj = {
      flex: 1,
      flexDirection: "column",

      justifyContent: "center",
      alignItems: "center",
    };
    return (
      <div>
        <SearchBox ref={this.searchRef} searchChange={this.onSearchChange} />
        {this.props.loading ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div>
              <CircularProgress />
            </div>
          </div>
        ) : (
          <div> {this.renderSurveys()} </div>
        )}

        <ConfirmDialog
          visible={this.state.isOpen}
          onDecline={this.onDecline.bind(this)}
          confirmDialog={this.state}
          setConfirmDialog={this.onAccept.bind(this)}
        >
          Are you sure you want to delete this?
        </ConfirmDialog>

        {this.props.deleted ? (
          <Notification
            notify={this.props.deleted}
            setNotify={() => this.props.employeeReset()}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const employees = Object.keys(state.employees).map((uid) => {
    return {
      uid,
      ...state.employees[uid],
    };
  });
  const { loggedin } = state.auth;
  const { loading } = state.employees;
  return { employees, loggedin, loading };
};

export default connect(mapStateToProps, {
  employeesFetch,

  employeeClear,

  employeesClear,
  employeeDelete,
  employeeReset,
})(ListItem);
