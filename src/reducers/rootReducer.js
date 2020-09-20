import { combineReducers } from "redux";

import productsFetchReducer from "./productsFetchReducer";
import productDetailReducer from "./productDetailReducer";
import cartReducer from "./cartReducer";
import authReducer from "./authReducer";
import messageReducer from "./messageReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  productsFetch: productsFetchReducer,
  productDetail: productDetailReducer,
  cart: cartReducer,
  auth: authReducer,
  message: messageReducer,
  order: orderReducer,
});

export default rootReducer;
