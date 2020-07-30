import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getOrderAction, changeStatusAction } from "../actions/orderActions";
import Loader from "../components/Loader";
const OrderDetails = ({ order, loading, getOrder, match, changeStatus }) => {
  const { id } = match.params;

  useEffect(() => {
    getOrder(id);
  }, [getOrder, id]);

  const [orderStatus, setOrderStatus] = useState("");
  const onStatusChanged = (e) => {
    setOrderStatus(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (orderStatus !== "") {
      changeStatus(id, orderStatus);
    }
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
            >
              <h5 className="center teal-text">Change Status</h5>
              <div className="input-field">
                <select
                  className="browser-default"
                  value={orderStatus}
                  onChange={onStatusChanged}
                >
                  <option value="">Status Of Order</option>
                  <option value="ready">Ready</option>
                  <option value="pending">Pending</option>
                  <option value="complete">Complete</option>
                </select>
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
            <li>
              <div style={inlineBox}>
                <p>Order Id</p>
                <p>{order._id}</p>
              </div>
              <div style={inlineBox}>
                <p>Status</p>
                <p>{order.status}</p>
              </div>
              <div style={inlineBox}>
                <p>Farmer Name</p>
                <p>{order.farmer && order.farmer.name}</p>
              </div>
              <div style={inlineBox}>
                <p>{order.customer && order.customer.name}</p>
                <p></p>
              </div>
            </li>
            <li>
              <div className="center-align">
                <h4>Products</h4>
              </div>
              <table className="centered">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Quantity</th>
                  </tr>
                </thead>

                <tbody>
                  {order.products &&
                    order.products.map((prod) => (
                      <tr key={prod._id}>
                        <td>{prod.name}</td>
                        <td>${prod.price}</td>
                        <td>{prod.quantity}</td>
                      </tr>
                    ))}

                  <tr>
                    <td colSpan="2">
                      <h6>
                        <b>Total Items</b>
                      </h6>
                    </td>
                    <td>
                      <b>{order.totalPrice}</b>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style={inlineBox}>
                <h5>Total price</h5>
                <h5>${order.totalPrice}</h5>
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
const mapStateToProps = ({ ordersData }) => {
  return {
    order: ordersData.order,
    loading: ordersData.loading,
  };
};
export default connect(mapStateToProps, {
  getOrder: getOrderAction,
  changeStatus: changeStatusAction,
})(OrderDetails);
