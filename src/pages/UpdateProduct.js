import React, { useRef, useEffect, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import {
  uploadProductPicAction,
  updateProductAction,
  getProductAction,
} from "../actions/productsActions";
import Loader from "../components/Loader";
const UpdateProduct = ({
  history,
  loading,
  updateProduct,
  uploadProductPic,
  match,
  getProduct,
  product,
  image,
}) => {
  const { id } = match.params;

  const fileRef = useRef(null);

  useEffect(() => {
    getProduct(id);
  }, [id, getProduct]);

  const [imageSelected, setImageSelected] = useState(false);

  const onChange = (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    uploadProductPic(formData);
    setImageSelected(true);
  };

  const productForm = yup.object({
    name: yup.string().required().min(4),
    price: yup.number().required().min(0),
    description: yup.string().required(),
  });

  return (
    <>
      <div className="center">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <div
            className="card-panel grey lighten-3"
            style={{
              width: "50%",
            }}
          >
            <h5>Update Product</h5>
            {loading ? (
              <Loader />
            ) : (
              <Formik
                validationSchema={productForm}
                initialValues={{
                  name: product.name,
                  description: product.description,
                  price: product.price,
                }}
                onSubmit={(values) => {
                  updateProduct(
                    id,
                    {
                      ...values,
                      image: imageSelected ? image : product.image,
                    },
                    history
                  );
                }}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                  touched,
                }) => (
                  <>
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Name"
                        onChange={handleChange("name")}
                        onBlur={handleBlur("name")}
                        value={values.name}
                        className={errors.name && touched.name ? "invalid" : ""}
                      />
                    </div>
                    <div className="input-field">
                      <input
                        type="number"
                        placeholder="Price"
                        onChange={handleChange("price")}
                        onBlur={handleBlur("price")}
                        value={values.price}
                        className={
                          errors.price && touched.price ? "invalid" : ""
                        }
                      />
                    </div>
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Description"
                        onChange={handleChange("description")}
                        onBlur={handleBlur("description")}
                        value={values.description}
                        className={
                          errors.description && touched.description
                            ? "invalid"
                            : ""
                        }
                      />
                    </div>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      onChange={onChange}
                      ref={fileRef}
                    />
                    <div className="left-align">
                      <button
                        className="waves-effect waves-light btn"
                        style={{
                          color: "teal",
                          background: "white",
                          borderRadius: "15px",
                          marginBottom: "20px",
                        }}
                        onClick={() => {
                          fileRef.current.click();
                        }}
                      >
                        <i className="material-icons right">attach_file</i>
                        Product Image
                      </button>
                    </div>
                    <br />

                    <input
                      type="submit"
                      value="Update"
                      className="btn"
                      onClick={handleSubmit}
                    />
                  </>
                )}
              </Formik>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ productsData }) => {
  return {
    loading: productsData.productLoading,
    product: productsData.product,
    image: productsData.image,
  };
};
export default connect(mapStateToProps, {
  updateProduct: updateProductAction,
  uploadProductPic: uploadProductPicAction,
  getProduct: getProductAction,
})(UpdateProduct);
