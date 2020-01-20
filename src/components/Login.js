import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import TextField from "material-ui/TextField";
import RaisedButton from "material-ui/RaisedButton";
import axios from "axios";
import store from "store2";
import "../App.css";

class Login extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      name: "",
      nameError: "",
      email: "",
      emailError: "",
      password: "",
      passwordError: "",
      errorMessage: ""
    };
  }

  handleChange = e => {
    e.preventDefault();
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  validate = () => {
    let isError = false;
    const error = {
      nameError: "",
      emailError: "",
      passwordError: "",
      errorMessage: ""
    };
    if (this.state.email.indexOf("@") === -1) {
      error.emailError = "email is invalid";
      isError = true;
    }
    if (this.state.password.length < 4) {
      error.passwordError = "password is invalid";
      isError = true;
    }
    this.setState({
      ...error
    });

    return isError;
  };

  handleSubmit = e => {
    e.preventDefault();
    const err = this.validate();
    if (!err) {
      const user = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      };

      axios
        .post("http://localhost:4000/admins/login", { user })
        .then(res => {
          this.processMessage(res);
        })
        .catch(err => {
          console.log(err);
        });

      this.setState({
        name: "",
        nameError: "",
        email: "",
        emailError: "",
        password: "",
        passwordError: ""
      });
    }
  };

  processMessage = res => {
    if (res.data.status === true) {
      //store token in store
      store.set("user", { token: res.data.token });
      this.props.history.push("/home");
    } else {
      const err = {
        errorMessage: ""
      };
      if (res.data.error === "Login failed! Check authentication credentials") {
        err.errorMessage = res.data.error;
      }

      this.setState({
        ...err
      });
    }
  };

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Logging Page" />
          <div className="App">
            <form>
              <h4 style={{ color: "red" }}>{this.state.errorMessage}</h4>
              <TextField
                name="name"
                hintText="name"
                value={this.state.name}
                floatingLabelText="Full Name"
                onChange={this.handleChange}
                errorText={this.state.nameError}
              />
              <br />
              <TextField
                name="email"
                hintText="email"
                floatingLabelText="Email"
                value={this.state.email}
                errorText={this.state.emailError}
                onChange={this.handleChange}
              />
              <br />
              <TextField
                name="password"
                hintText="password"
                type="password"
                value={this.state.password}
                floatingLabelText="Password"
                onChange={this.handleChange}
                errorText={this.state.passwordError}
              />
              <br />
              <RaisedButton
                label="Login"
                primary={true}
                style={{ margin: "15px" }}
                onClick={this.handleSubmit}
              />
            </form>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Login;
