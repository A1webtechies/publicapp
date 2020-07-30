import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { getOrdersAction, filterOrderAction } from "../actions/orderActions";
import Loader from "../components/Loader";
const Orders = ({ getOrders, ordersData, filterOrder }) => {
  useEffect(() => {
    getOrders();
  }, [getOrders]);

  const { loading, orders } = ordersData;
  const [orderStatus, setOrderStatus] = useState("");
  const onStatusChanged = (e) => {
    if (e.target.value.length !== 0) {
      filterOrder(e.target.value);
    }
    setOrderStatus(e.target.value);
  };
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
              <select
                className="browser-default"
                value={orderStatus}
                onChange={onStatusChanged}
              >
                <option defaultValue>Status Of Order</option>
                <option value="ready">Ready</option>
                <option value="pending">Pending</option>
                <option value="complete">Complete</option>
              </select>
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
            {loading ? (
              <div className="center">
                <Loader />
              </div>
            ) : (
              <>
                {orders.map((order) => (
                  <Link
                    className="collection-item"
                    key={order._id}
                    to={`/orderdetails/${order._id}`}
                  >
                    <div>
                      {order.farmer.name}
                      <div className="secondary-content">{order.status}</div>
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
const mapStateToProps = ({ ordersData }) => {
  return {
    ordersData,
  };
};
export default connect(mapStateToProps, {
  getOrders: getOrdersAction,
  filterOrder: filterOrderAction,
})(Orders);
