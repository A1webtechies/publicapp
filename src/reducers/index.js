import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";

import productsReducer from "./productsReducer";

import orderReducer from "./orderReducer";
import adminReducer from "./adminReducer";

export default combineReducers({
  auth: authReducer,
  errorsData: errorReducer,
  productsData: productsReducer,
  ordersData: orderReducer,
  adminData: adminReducer,
});
