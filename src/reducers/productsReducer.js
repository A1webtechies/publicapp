import {
  GET_PRODUCTS,
  SET_PRODUCTS_LOADING,
  GET_PRODUCT,
  ADD_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
  UPLOAD_PIC,
} from "../actions/types";

const initialState = {
  productLoading: false,
  products: [],
  product: {},
  image: "no-image.jpg",
  refreshProduct: false,
};

const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productLoading: false,
        products: action.payload,
        refreshProduct: false,
      };
    case SET_PRODUCTS_LOADING:
      return {
        ...state,
        productLoading: true,
      };
    case GET_PRODUCT:
      return {
        ...state,
        productLoading: false,
        product: action.payload,
      };
    case ADD_PRODUCT:
      return {
        ...state,
        productLoading: false,
        refreshProduct: false,
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productLoading: false,
        refreshProduct: true,
      };
    case UPDATE_PRODUCT:
      return {
        ...state,
        productLoading: false,
        refreshProduct: false,
      };
    case UPLOAD_PIC:
      return {
        ...state,
        productLoading: false,
        image: action.payload,
        refreshProduct: false,
      };

    default:
      return state;
  }
};
export default productsReducer;
