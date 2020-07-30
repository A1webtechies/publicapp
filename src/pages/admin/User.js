import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getUserAction, updateUserAction } from "../../actions/adminActions";
import Loader from "../../components/Loader";
const User = ({ getUser, match, loading, user, updateUser }) => {
  const { id } = match.params;
  useEffect(() => {
    getUser(id);
  }, [getUser, id]);

  const [newPassword, setnewPassword] = useState("");
  const [accountStatus, setAccountStatus] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();
    let options = {};
    if (accountStatus.length !== 0) {
      options.accountStatus = accountStatus;
    }
    if (newPassword.length !== 0) {
      options.password = newPassword;
    }
    updateUser(id, options);
    setAccountStatus("");
    setnewPassword("");
  };

  const { inlineBox } = styles;
  return (
    <>
      <ul className="collection">
        <li>
          <form onSubmit={onSubmit}>
            <div
              style={{
                width: "80%",
                margin: "0 auto",
              }}
              className="card-panel grey lighten-3"
            >
              <div className="center">
                <h5>Update User</h5>
              </div>
              <div className="row">
                <div className="col s12 m12">
                  <div className="input-field">
                    <select
                      className="browser-default"
                      value={accountStatus}
                      onChange={(e) => {
                        setAccountStatus(e.target.value);
                      }}
                    >
                      <option value="">Change Account Status</option>
                      <option value="deactivates">Deactivates</option>
                      <option value="active">Active</option>
                    </select>
                  </div>
                </div>
                <div className="col s12 m12">
                  <div className="input-field">
                    <input
                      type="text"
                      placeholder="New Password"
                      value={newPassword}
                      onChange={(e) => {
                        setnewPassword(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="center">
                <button className="btn" type="submit">
                  Save
                </button>
              </div>
            </div>
          </form>
        </li>
        {loading ? (
          <div className="center">
            <Loader />
          </div>
        ) : (
          <>
            <li className="collection-item">
              <div style={inlineBox}>
                <p> Name: </p>
                <p>{user.name}</p>
              </div>
              <div style={inlineBox}>
                <p> Account Status: </p>
                <p
                  style={{
                    color: user.accounts === "active" ? "teal" : "red",
                  }}
                >
                  {user.accounts}
                </p>
              </div>
              <div style={inlineBox}>
                <p> Role: </p>
                <p
                  style={{
                    color: "teal",
                  }}
                >
                  {user.role}
                </p>
              </div>
              <div style={inlineBox}>
                <p> Email: </p>
                <p>{user.email}</p>
              </div>
            </li>
          </>
        )}
      </ul>
    </>
  );
};

const styles = {
  inlineBox: {
    display: "inline-flex",
    width: "100%",
    justifyContent: "space-between",
    padding: "10px 15px ",
    borderBottom: "1px solid lightgrey",
  },
};
const mapStateToProps = ({ adminData }) => {
  return {
    user: adminData.user,
    loading: adminData.loading,
  };
};
export default connect(mapStateToProps, {
  getUser: getUserAction,
  updateUser: updateUserAction,
})(User);
