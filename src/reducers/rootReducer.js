import { combineReducers } from "redux";

import productDetailReducer from "./productDetailReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import orderManageReducer from "./orderManageReducer";
import productManageReducer from "./productManageReducer";

const rootReducer = combineReducers({
  productDetail: productDetailReducer,
  cart: cartReducer,
  auth: authReducer,
  message: messageReducer,
  orderManage: orderManageReducer,
  productManage: productManageReducer,
});

export default rootReducer;
