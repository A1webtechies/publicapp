import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getAllUsersAction } from "../../actions/adminActions";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";
const Dashboard = ({ getUsers, loading, users }) => {
  useEffect(() => {
    getUsers();
  }, [getUsers]);
  return (
    <>
      <ul className="collection with-header">
        <li className="collection-header">
          <div className="center">
            <h4>All Users</h4>
          </div>
        </li>
        {loading ? (
          <div className="center">
            <Loader />
          </div>
        ) : (
          <>
            {users.map((user) => (
              <Link
                to={`user/${user._id}`}
                className="collection-item"
                key={user._id}
              >
                <div>
                  <span style={{ fontSize: 20, color: "black" }}>
                    {user.name}
                  </span>
                  <span className="secondary-content">{user.role}</span>
                </div>
              </Link>
            ))}
          </>
        )}
      </ul>
    </>
  );
};
const mapStateToProps = ({ adminData }) => {
  return {
    users: adminData.users,
    loading: adminData.loading,
  };
};
export default connect(mapStateToProps, {
  getUsers: getAllUsersAction,
})(Dashboard);
