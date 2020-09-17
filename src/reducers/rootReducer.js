import { combineReducers } from "redux";

import productListReducer from "./ProductListReducer";
import productDetailReducer from "./ProductDetailReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";

const rootReducer = combineReducers({
  productList: productListReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  auth: authReducer,
  message: messageReducer,
});

export default rootReducer;
