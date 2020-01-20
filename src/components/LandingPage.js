import React, { Component } from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";

class LandingPage extends Component {
  handleChange = e => {
    e.preventDefault();
  };
  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Landing Page" />
          <RaisedButton
            label="Go Login"
            primary={true}
            style={{ margin: "15px" }}
            onClick={() => {
              this.props.history.push("./login");
            }}
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

export default LandingPage;
