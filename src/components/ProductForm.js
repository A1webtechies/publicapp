import React, { useRef } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
const ProductFrom = ({ data, title, btnText }) => {
  const formValue =
    data === null
      ? {
          name: "",
          price: 1,
          description: "",
        }
      : data;

  const fileRef = useRef(null);

  const onChnage = (e) => {
    console.log(e.target.files[0]);
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
            <h5>{title}</h5>
            <Formik
              validationSchema={productForm}
              initialValues={formValue}
              onSubmit={(values) => {
                console.log(values);
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
                    onChange={onChnage}
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
                    value={btnText}
                    className="btn"
                    onClick={handleSubmit}
                  />
                </>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductFrom;
