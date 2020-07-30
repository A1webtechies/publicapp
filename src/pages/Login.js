import React, { useEffect } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { connect } from "react-redux";
import { loginUserAction } from "../actions/authActions";
import Loader from "../components/Loader";
const Login = ({
  loginUser,
  loading,
  loginError,
  history,
  isAuthenticated,
  role,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      if (role === "admin") {
        history.push("/dashboard");
      } else if (role === "farmer") {
        history.push("/");
      }
    }
  }, [history, isAuthenticated, role]);
  const loginSchema = yup.object({
    email: yup.string().required().email(),
    password: yup.string().required().min(6).max(22),
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
            <h5>Login</h5>
            <Formik
              validationSchema={loginSchema}
              initialValues={{
                email: "",
                password: "",
              }}
              onSubmit={(values) => {
                loginUser(values, history);
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
                      type="email"
                      placeholder="Email"
                      onChange={handleChange("email")}
                      onBlur={handleBlur("email")}
                      value={values.email}
                      className={errors.email && touched.email ? "invalid" : ""}
                    />
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
                  <div className="">
                    {Object.keys(loginError).length !== 0 ? (
                      <h6 className="red-text">Wrong Creds !</h6>
                    ) : (
                      <></>
                    )}
                  </div>
                  {loading && Object.keys(loginError).length === 0 ? (
                    <Loader />
                  ) : (
                    <input
                      type="submit"
                      value="Login"
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
  console.log(auth);
  return {
    loginError: errorsData,
    loading: auth.isAuthLoading,
    isAuthenticated: auth.isAuthenticated,
    role: auth.user.role,
  };
};
export default connect(mapStateToProps, { loginUser: loginUserAction })(Login);
