import React, { Component } from "react";
import LandingPage from "./components/LandingPage";
import Login from "./components/Login";
import Home from "./components/Home";
import { ProtectedRoute } from "./auth/ProtectedRoute";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import "./App.css";

class App extends Component {
  state = {};
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route path="/login" exact component={Login} />
            <ProtectedRoute path="/home" exact component={Home} />
            <Route path="*" render={() => <h1>404 NOT FOUND!</h1>} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
