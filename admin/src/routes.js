import React from "react";
import { Switch } from "react-router-dom";

import PrivateRoute from "./lib/PrivateRoute";
import PublicRoute from "./lib/PublicRoute";

import LandingPage from "./component/page/Landing";
import LoginPage from "./component/page/Login";
import RegisterPage from "./component/page/Register";
import UpdatePage from "./component/UI/atom/update_button";

const Routes = () => {
  return (
    <Switch>
      <PublicRoute
        component={<LandingPage />}
        restricted={false}
        path="/"
        exact
      />
      <PublicRoute
        component={<LoginPage />}
        restricted={true}
        path="/login"
        exact
      />
      <PublicRoute
        component={<RegisterPage />}
        restricted={true}
        path="/register"
        exact
      />
      <PrivateRoute component={<UpdatePage />} path="/admin" exact />
    </Switch>
  );
};

export default Routes;
