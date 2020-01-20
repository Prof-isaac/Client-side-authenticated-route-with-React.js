import React from "react";
import { Route, Redirect } from "react-router-dom";
import store from "store2";
import jwt_decode from "jwt-decode";

//we passing component as a prop which we will distructure and call it component
//with capital letter C, the rest of the props are passsed in as rest
export const ProtectedRoute = ({ component: Component, ...rest }) => {
  //verify token

  const checkAuth = () => {
    if (store === null) {
      return false;
    } else {
      const token = store.get("user").token;
      const decoded = jwt_decode(token);
      if (decoded._id.length > 22) {
        return true;
      } else {
        return false;
      }
    }
  };

  return (
    <Route
      {...rest}
      render={props => {
        if (checkAuth()) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/",
                state: {
                  from: props.location
                }
              }}
            />
          );
        }
      }}
    />
  );
};
