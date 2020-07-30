import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getLogsAction } from "../../actions/adminActions";
import Loader from "../../components/Loader";
const Logs = ({ getLogs, logs, loading }) => {
  useEffect(() => {
    getLogs();
  }, [getLogs]);
  return (
    <>
      <ul className="collection with-header">
        <li className="collection-header">
          <div className="center">
            <h4>Logs</h4>
          </div>
        </li>
        {loading ? (
          <div className="center">
            <Loader />
          </div>
        ) : (
          <>
            {logs.map((log, index) => (
              <li className="collection-item " key={index}>
                <p>{log} </p>
              </li>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

const mapStateToProps = ({ adminData }) => {
  return {
    logs: adminData.logs,
    loading: adminData.loading,
  };
};
export default connect(mapStateToProps, {
  getLogs: getLogsAction,
})(Logs);
