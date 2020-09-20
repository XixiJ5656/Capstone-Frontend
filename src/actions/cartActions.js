import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  SAVE_SHIPPING,
  SAVE_PAYMENT,
} from "./actionTypes";
import axios from "axios";
import Cookie from "js-cookie";

const addToCart = (id, qty, size, color) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/app/products/" + id
    );
    dispatch({
      type: ADD_TO_CART,
      payload: {
        id: data.id,
        name: data.name,
        image: data.image[0],
        price: data.price,
        inventory: data.inventory,
        qty,
        size,
        color,
      },
    });
    const {
      cart: { cartItems },
    } = getState();
    Cookie.set("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error);
  }
};

const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: REMOVE_FROM_CART, payload: id });
  const {
    cart: { cartItems },
  } = getState();
  Cookie.set("cartItems", JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch, getState) => {
  dispatch({ type: SAVE_SHIPPING, payload: data });
  const {
    cart: { shipping },
  } = getState();
  Cookie.set("shipping", JSON.stringify(shipping));
};

const savePayment = (data) => (dispatch, getState) => {
  dispatch({ type: SAVE_PAYMENT, payload: data });
  const {
    cart: { payment },
  } = getState();
  Cookie.set("payment", JSON.stringify(payment));
};

export default { addToCart, removeFromCart, saveShipping, savePayment };
