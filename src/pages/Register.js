import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import { registerUserAction } from "../actions/authActions";
const Register = ({
  registerUser,
  loading,
  registerError,
  isAuthenticated,
  history,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
    }
  }, [history, isAuthenticated]);
  const registerSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6).max(22),
    name: yup.string().required().min(4),
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
            <h5>Register</h5>
            <Formik
              validationSchema={registerSchema}
              initialValues={{
                email: "",
                password: "",
                name: "",
              }}
              onSubmit={(values) => {
                registerUser(values);
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
                      type="email"
                      placeholder="Email"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      className={errors.email && touched.email ? "invalid" : ""}
                    />
                    {Object.keys(registerError).length !== 0 ? (
                      <div className="text-red">
                        The is email is already taken
                      </div>
                    ) : (
                      <> </>
                    )}
                  </div>
                  <div className="input-field">
                    <input
                      type="password"
                      placeholder="Password"
                      onChange={handleChange("password")}
                      onBlur={handleBlur("password")}
                      value={values.password}
                      className={
                        errors.password && touched.password ? "invalid" : ""
                      }
                    />
                  </div>

                  {loading ? (
                    <div className="spinner-layer spinner-green">
                      <div className="circle-clipper left">
                        <div className="circle"></div>
                      </div>
                      <div className="gap-patch">
                        <div className="circle"></div>
                      </div>
                      <div className="circle-clipper right">
                        <div className="circle"></div>
                      </div>
                    </div>
                  ) : (
                    <input
                      type="submit"
                      value="Register"
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
const mapStateToProps = ({ errorsData, auth }) => {
  return {
    registerError: errorsData,
    loading: auth.isAuthLoading,
    isAuthenticated: auth.isAuthenticated,
  };
};
export default connect(mapStateToProps, { registerUser: registerUserAction })(
  Register
);
