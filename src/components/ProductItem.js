import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteProductAction } from "../actions/productsActions";
const ProductItem = ({ product, deleteProduct }) => {
  return (
    <>
      <div className="col s6 m4">
        <div className="card">
          <div className="card-image">
            <img src={product.image} height="200" alt="" />

            <span className="card-title">{product.name}</span>
          </div>
          <div className="card-content">
            <p>{product.description}</p>
          </div>
          <div className="card-action">
            <div>Price: ${product.price}</div>
            <div
              style={{
                width: "100%",
                display: "inline-flex",
                justifyContent: "space-between",
              }}
            >
              <Link
                to={`/edit/${product._id}`}
                className="btn"
                style={{
                  width: "40%",
                  background: "white",
                  border: "1px solid teal",
                  borderRadius: "15px",
                  color: "teal",
                  marginTop: "20px",
                }}
              >
                Edit
              </Link>
              <button
                className="btn "
                style={{
                  width: "40%",
                  background: "white",
                  border: "1px solid red",
                  borderRadius: "15px",
                  color: "red",
                  marginTop: "20px",
                }}
                onClick={() => {
                  deleteProduct(product._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, {
  deleteProduct: deleteProductAction,
})(ProductItem);
