import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import RaisedButton from "material-ui/RaisedButton";
import AppBar from "material-ui/AppBar";
import store from "store2";

class Home extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Home Page" />
          <h1>Welcome to home</h1>
          <RaisedButton
            label="Logout"
            primary={true}
            style={{ margin: "15px" }}
            onClick={() => {
              store.remove("user");
              this.props.history.push("/login");
            }}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default Home;
