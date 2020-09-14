import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productReducer from "./productReducer";
import orderReducer from "./orderReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
  product: productReducer,
  order: orderReducer,
});

export default rootReducer;
