import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import jwt_decode from "jwt-decode";
import "../../node_modules/materialize-css/dist/css/materialize.min.css";
import M from "../../node_modules/materialize-css/dist/js/materialize.min.js";

import Header from "./Header";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Products from "../pages/Products";
import AddProduct from "../pages/AddProduct";
import UpdateProduct from "../pages/UpdateProduct";
import Orders from "../pages/Orders";
import OrderDetails from "../pages/OrderDeteils";
import Dashboard from "../pages/admin/Dashboard";
import { setCurrentUser, logoutUserAction } from "../actions/authActions";
import store from "../Store";
import User from "../pages/admin/User";
import Transcations from "../pages/admin/Transcations";
import TransactionDetails from "../pages/admin/TransactionDetails";
import Logs from "../pages/admin/Logs";

if (localStorage.jwtToken) {
  // Set auth token header auth
  const { jwtToken } = localStorage;

  const decoded = jwt_decode(jwtToken);

  const { exp } = decoded;
  console.log("s", Date.now() + 10 * 24 * 60 * 60 * 1000 >= exp * 1000);
  console.log(jwtToken);
  if (
    (Date.now() + 10 * 24 * 60 * 60 * 1000 <= exp * 1000 &&
      jwtToken !== null) ||
    jwtToken !== undefined
  ) {
    store.dispatch(setCurrentUser(jwtToken));
  } else {
    store.dispatch(logoutUserAction());

    window.location.href = "/login";
  }
}
const App = () => {
  useEffect(() => {
    M.AutoInit();
  }, []);

  return (
    <Router>
      <Header />
      <div className="container">
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Switch>
          <PrivateRoute exact path="/" component={Products} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/add" component={AddProduct} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/orders" component={Orders} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/transcation" component={Transcations} />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/logs" component={Logs} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/transcation/:id"
            component={TransactionDetails}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/user/:id" component={User} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/orderdetails/:id"
            component={OrderDetails}
          />
        </Switch>
        <Switch>
          <PrivateRoute exact path="/edit/:id" component={UpdateProduct} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
