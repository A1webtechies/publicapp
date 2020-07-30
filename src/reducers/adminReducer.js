import {
  GET_ALL_USERS,
  SET_USERS_LOADING,
  GET_USER,
  UPDATE_USER,
  GET_ALL_ORDERS,
  SET_ALL_ORDERS_LOADING,
  GET_LOGS,
} from "../actions/types";

const initialState = {
  users: [],
  loading: false,
  user: {},
  orders: [],
  order: {},
  orderLoading: false,
  logs: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false,
      };
    case SET_USERS_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_ALL_ORDERS_LOADING:
      return {
        ...state,
        orderLoading: true,
      };
    case GET_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case GET_ALL_ORDERS:
      return {
        ...state,
        orderLoading: false,
        orders: action.payload,
      };
    case GET_LOGS:
      return {
        ...state,
        loading: false,
        logs: action.payload,
      };
    default:
      return state;
  }
};

export default adminReducer;
