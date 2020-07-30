import API from "../api";
import {
  GET_ORDERS,
  SET_ORDER_LOADING,
  CHANGE_STATUS,
  GET_ORDER,
} from "./types";

import { clearErrors, setErrors, setLoading } from "../utils/errors";

export const getOrdersAction = () => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_ORDER_LOADING));
      const { data } = await API.get("/order/farmer");
      dispatch({
        type: GET_ORDERS,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
export const filterOrderAction = (params) => {
  return async (dispatch) => {
    try {
      console.log("params", params);
      dispatch(clearErrors());
      dispatch(setLoading(SET_ORDER_LOADING));
      const { data } = await API.put("/order/farmer", {
        status: params,
      });
      console.log(data);
      dispatch({
        type: GET_ORDERS,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};

export const getOrderAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_ORDER_LOADING));
      const { data } = await API.get(`/order/${id}`);
      console.log(data);
      dispatch({
        type: GET_ORDER,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};

export const changeStatusAction = (id, status) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_ORDER_LOADING));
      const { data } = await API.put(`/order/${id}`, { status });

      dispatch({
        type: CHANGE_STATUS,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
