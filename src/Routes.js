import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import Shop from "./core/Shop";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import UserDashboard from "./user/UserDashboard";
import AdminDashboard from "./user/AdminDashboard";
import AddCategory from "./admin/AddCategory";
import AddProduct from "./admin/AddProduct";

import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/shop' component={Shop} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
        <PrivateRoute exact path='/user/dashboard' component={UserDashboard} />
        <AdminRoute exact path='/admin/dashboard' component={AdminDashboard} />
        <AdminRoute exact path='/create/category' component={AddCategory} />
        <AdminRoute exact path='/create/product' component={AddProduct} />
      </Switch>
    </Router>
  );
};

export default Routes;
