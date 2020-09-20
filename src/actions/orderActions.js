import {
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAIL,
} from "./actionTypes";
import axios from "axios";
import Cookie from "js-cookie";

const saveOrder = (data) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_ORDER_REQUEST,
    payload: data,
  });
  try {
    await axios.post("http://localhost:8080/api/app/orders/", data);
    dispatch({
      type: SAVE_ORDER_SUCCESS,
      payload: data,
    });
    const {
      order: { orderConfirmation },
    } = getState();
    Cookie.set("orderConfirmation", JSON.stringify(orderConfirmation));
  } catch (error) {
    console.log(error);
    dispatch({
      type: SAVE_ORDER_FAIL,
    });
  }
};

export default { saveOrder };
