import API from "../api";

import {
  GET_ALL_USERS,
  SET_USERS_LOADING,
  UPDATE_USER,
  GET_USER,
  SET_ALL_ORDERS_LOADING,
  GET_ALL_ORDERS,
  GET_LOGS,
} from "./types";
import { clearErrors, setErrors, setLoading } from "../utils/errors";

export const getAllUsersAction = () => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_USERS_LOADING));
      const { data } = await API.get("/user/");
      dispatch({
        type: GET_ALL_USERS,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};

export const getUserAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_USERS_LOADING));
      const { data } = await API.get(`/user/${id}`);
      dispatch({
        type: GET_USER,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
export const updateUserAction = (id, options) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_USERS_LOADING));
      const { data } = await API.patch(`/user/${id}`, options);
      dispatch({
        type: UPDATE_USER,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
export const getOrderAction = () => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_ALL_ORDERS_LOADING));
      const { data } = await API.get("/order/admin");
      dispatch({
        type: GET_ALL_ORDERS,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
export const filterOrderAction = (date) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_ALL_ORDERS_LOADING));
      const { data } = await API.put("/order/admin", { date });
      dispatch({
        type: GET_ALL_ORDERS,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};

export const getLogsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_USERS_LOADING));
      const { data } = await API.get("/user/logs");
      dispatch({
        type: GET_LOGS,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
