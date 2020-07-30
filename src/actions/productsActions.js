import API from "../api";
import {
  GET_PRODUCTS,
  SET_PRODUCTS_LOADING,
  ADD_PRODUCT,
  UPLOAD_PIC,
  UPDATE_PRODUCT,
  DELETE_PRODUCT,
  GET_PRODUCT,
} from "./types";
import { clearErrors, setErrors, setLoading } from "../utils/errors";

export const getProductsAction = () => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_PRODUCTS_LOADING));
      const { data } = await API.get(`product/products`);

      dispatch({
        type: GET_PRODUCTS,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
export const addProductAction = (productData, history) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_PRODUCTS_LOADING));
      const { data } = await API.post("/product/", productData);

      dispatch({
        type: ADD_PRODUCT,
        payload: data.data,
      });
      history.push("/");
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
export const uploadProductPicAction = (pic) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_PRODUCTS_LOADING));
      const { data } = await API.post("/product/uploads", pic);

      dispatch({
        type: UPLOAD_PIC,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};

export const updateProductAction = (id, productData, history) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_PRODUCTS_LOADING));
      const { data } = await API.put(`/product/${id}`, productData);

      dispatch({
        type: UPDATE_PRODUCT,
        payload: data.data,
      });
      history.push("/");
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
export const deleteProductAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_PRODUCTS_LOADING));
      await API.delete(`/product/${id}`);
      
      dispatch({
        type: DELETE_PRODUCT,
       
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};

export const getProductAction = (id) => {
  return async (dispatch) => {
    try {
      dispatch(clearErrors());
      dispatch(setLoading(SET_PRODUCTS_LOADING));
      const { data } = await API.get(`/product/${id}`);

      dispatch({
        type: GET_PRODUCT,
        payload: data.data,
      });
    } catch (error) {
      dispatch(setErrors(error.message));
    }
  };
};
