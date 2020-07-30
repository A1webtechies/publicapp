import React, { useRef, useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import {
  addProductAction,
  uploadProductPicAction,
} from "../actions/productsActions";
import Loader from "../components/Loader";
const AddProduct = ({
  history,
  loading,
  addProduct,
  uploadProductPic,
  image,
}) => {
  const fileRef = useRef(null);
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
            <h5>Add Product</h5>
            <Formik
              validationSchema={productForm}
              initialValues={{
                name: "",
                price: 1,
                description: "",
              }}
              onSubmit={(values) => {
              
                addProduct(
                  { ...values, image: imageSelected ? image : "no-image.jpg" },
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
                      className={errors.price && touched.price ? "invalid" : ""}
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
                  {loading ? (
                    <Loader />
                  ) : (
                    <input
                      type="submit"
                      value="Add"
                      className="btn"
                      onClick={handleSubmit}
                    />
                  )}
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};
const mapStateToProps = ({ productsData }) => {
  return {
    loading: productsData.productLoading,
    image: productsData.image,
  };
};
export default connect(mapStateToProps, {
  addProduct: addProductAction,
  uploadProductPic: uploadProductPicAction,
})(AddProduct);
