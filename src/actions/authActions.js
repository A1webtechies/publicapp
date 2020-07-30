import API from "../api";
import { setAuthTokenToEachRequest } from "../utils/authToken";
import {
  SET_CURRENT_USER,
  SET_ERRORS,
  LOGOUT_USER,
  SET_AUTH_LOADING,
} from "./types";

import { clearErrors, setErors, setLoading } from "../utils/errors";

// Register User
export const registerUserAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_AUTH_LOADING));
      data.role = "farmer";

      const res = await API.post("/auth/register", data);

      const { token } = res.data;

      setUser(dispatch, token);
    } catch (error) {
      dispatch({
        type: SET_ERRORS,
        payload: error.message,
      });
    }
  };
};
export const setCurrentUser = (token) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_AUTH_LOADING));
      setUser(dispatch, token);
    } catch (error) {
      dispatch({
        type: SET_ERRORS,
        payload: error.message,
      });
    }
  };
};

export const logoutUserAction = () => {
  return (dispatch) => {
    localStorage.removeItem("jwtToken");
    setAuthTokenToEachRequest(false);

    dispatch({
      type: LOGOUT_USER,
    });
  };
};

export const loginUserAction = (data) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_AUTH_LOADING));
      const res = await API.post("/auth/login", data);

      const { token } = res.data;

      setUser(dispatch, token);
    } catch (error) {
      dispatch({
        type: SET_ERRORS,
        payload: error.message,
      });
    }
  };
};

export const setUser = async (dispatch, token) => {
  localStorage.setItem("jwtToken", token);

  setAuthTokenToEachRequest(token);

  const res = await API.get("/auth/current");

  dispatch({
    type: SET_CURRENT_USER,
    payload: res.data.data,
  });
};
