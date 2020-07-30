import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Materialize from "materialize-css";
import * as moment from "moment";
import { connect } from "react-redux";
import { getOrderAction, filterOrderAction } from "../../actions/adminActions";
import Loader from "../../components/Loader";

const Transcations = ({ getOrders, adminData, filterOrder }) => {
  useEffect(() => {
    getOrders();
    var elems = document.querySelectorAll(".dateset");
    Materialize.Datepicker.init(elems, {
      defaultDate: new Date(),
      format: "mmm dd, yyyy",
      container: "body",
      onSelect: function (date) {
        filterOrder(date);
      },
      autoClose: true,
      setDefaultDate: true,
    });
  }, [getOrders, filterOrder]);

  const { orderLoading, orders } = adminData;

  return (
    <>
      <div className="container">
        <form>
          <div
            style={{
              width: "80%",
              margin: "0 auto",
            }}
          >
            <h5 className="center teal-text">Filter Orders</h5>
            <div className="input-field">
              <input type="text" className="datepicker dateset" />
            </div>
          </div>
        </form>
      </div>
      <ul className="collection with-header">
        <li className="collection-header">
          <div className="center">
            <h4>Orders</h4>
          </div>
        </li>
        {orders.length === 0 ? (
          <h4>No Order</h4>
        ) : (
          <>
            {orderLoading ? (
              <div className="center">
                <Loader />
              </div>
            ) : (
              <>
                {orders.map((order) => (
                  <Link
                    className="collection-item"
                    key={order._id}
                    to={`/transcation/${order._id}`}
                  >
                    <div>
                      {order.farmer.name}
                      <div className="secondary-content">
                        {moment(order.updatedAt).format("MMM/DD/YYYY")}
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            )}
          </>
        )}
      </ul>
    </>
  );
};
const mapStateToProps = ({ adminData }) => {
  return {
    adminData,
  };
};
export default connect(mapStateToProps, {
  getOrders: getOrderAction,
  filterOrder: filterOrderAction,
})(Transcations);
