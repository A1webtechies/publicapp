import {CLEAR_ERRORS, SET_ERRORS} from '../actions/types';
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};

export const setErrors = (error) => {
  return {
    type: SET_ERRORS,
    payload: error,
  };
};

export const setLoading = (type) => {
  return {
    type,
  };
};
