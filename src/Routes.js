import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashboard";

import PrivateRoute from "./auth/PrivateRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <PrivateRoute exact path='/user/dashboard' component={UserDashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;
