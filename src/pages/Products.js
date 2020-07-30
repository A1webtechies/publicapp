import React, { Fragment, useEffect } from "react";

import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ProductItem from "../components/ProductItem";
import Loader from "../components/Loader";
import { getProductsAction } from "../actions/productsActions";

const Products = ({ productsData, getProducts }) => {
  const { products, productLoading, refreshProduct } = productsData;
  useEffect(() => {
    getProducts();
  }, [getProducts, refreshProduct]);

  return (
    <>
      <div className="center">
        <h3>Products</h3>

        <hr />
      </div>
      {products.length === 0 ? (
        <h3> No Product please add some products</h3>
      ) : (
        <>
          {productLoading ? (
            <div className="center">
              <Loader />
            </div>
          ) : (
            <div className="row">
              {products.map((product) => (
                <Fragment key={product._id}>
                  <ProductItem product={product} />
                </Fragment>
              ))}
            </div>
          )}
        </>
      )}
      <div
        style={{
          position: "fixed",
          bottom: 25,
          right: 30,
        }}
      >
        <Link
          className="btn-floating btn-large waves-effect waves-light "
          to="/add"
        >
          <i className="material-icons">add</i>
        </Link>
      </div>
    </>
  );
};
const mapStateToProps = ({ productsData }) => {
  return {
    productsData,
  };
};
export default connect(mapStateToProps, {
  getProducts: getProductsAction,
})(Products);
