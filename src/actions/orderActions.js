import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAIL,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
} from "./actionTypes";

import axios from "axios";
import Cookie from "js-cookie";

const fetchOrders = () => async (dispatch) => {
  dispatch({ type: FETCH_ORDER_REQUEST });
  try {
    const { data } = await axios.get("/api/app/orders");
    dispatch({ type: FETCH_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ORDER_FAIL, payload: error.message });
  }
};

const saveOrder = (data) => async (dispatch) => {
  dispatch({ type: SAVE_ORDER_REQUEST, payload: data });
  try {
    await axios.post("/api/app/orders", data).then((response) => {
      dispatch({ type: SAVE_ORDER_SUCCESS, payload: response.data });
    });
  } catch (error) {
    dispatch({ type: SAVE_ORDER_FAIL, payload: error.message });
  }
};

const deleteOrderById = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST, payload: id });
  try {
    await axios.delete("/api/app/orders/" + id);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.message });
  }
};
export default { saveOrder, deleteOrderById, fetchOrders };
