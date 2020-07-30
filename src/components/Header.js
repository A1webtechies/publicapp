/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUserAction } from "../actions/authActions";
const Header = ({ isAuthenticated, logoutUser, history, role }) => {
  return (
    <>
      <nav className="teal">
        <div className="container">
          <div className="nav-wrapper">
            <Link
              to={role !== "admin" ? "/" : "/dashboard"}
              className="brand-logo"
            >
              Farmer App
            </Link>

            <a href="#" data-target="slide-out" className="sidenav-trigger">
              <i className="material-icons">menu</i>
            </a>

            <ul className="right hide-on-med-and-down">
              {isAuthenticated ? (
                <>
                  {role === "admin" ? (
                    <>
                      <li>
                        <Link to="/dashboard">Users</Link>
                      </li>
                      <li>
                        <Link to="/transcation">Transcation</Link>
                      </li>
                      <li>
                        <Link to="logs"> Logs</Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <Link to="/">Products</Link>
                      </li>
                      <li>
                        <Link to="/orders">Orders</Link>
                      </li>
                    </>
                  )}
                  <li>
                    <Link
                      className="btn red"
                      to="/"
                      onClick={() => {
                        logoutUser();
                      }}
                    >
                      Logout
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="active">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <ul id="slide-out" className="sidenav">
        {isAuthenticated ? (
          <>
            {role === "admin" ? (
              <>
                <li>
                  <Link to="/dashboard">Users</Link>
                </li>
                <li>
                  <Link to="/transcation">Transcation</Link>
                </li>
                <li>
                  <Link to="logs"> Logs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Products</Link>
                </li>
                <li>
                  <Link to="/orders">Orders</Link>
                </li>
              </>
            )}
            <li>
              <Link
                className="btn red"
                to="/"
                onClick={() => {
                  logoutUser();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="active">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        )}
      </ul>
    </>
  );
};
const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth.isAuthenticated,
    role: auth.user.role,
  };
};
export default connect(mapStateToProps, {
  logoutUser: logoutUserAction,
})(Header);
