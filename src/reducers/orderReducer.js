import {
  GET_ORDERS,
  SET_ORDER_LOADING,
  ADD_ORDER,
  GET_ORDER,
  CHANGE_STATUS,
} from ".././actions/types";

const initailState = {
  loading: false,
  orders: [],
  order: {},
};

const orderReducer = (state = initailState, action) => {
  switch (action.type) {
    case SET_ORDER_LOADING:
      return {
        ...state,
        loading: true,
        refresh: false,
      };
    case ADD_ORDER: {
      return {
        ...state,
        loading: false,
        refresh: true,
      };
    }
    case GET_ORDERS:
      return {
        ...state,
        orders: action.payload,
        loading: false,
        refresh: false,
      };
    case GET_ORDER:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    case CHANGE_STATUS:
      return {
        ...state,
        loading: false,
        order: action.payload,
      };
    default:
      return state;
  }
};

export default orderReducer;
