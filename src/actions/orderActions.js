import {
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
  SAVE_ORDER_REQUEST,
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAIL,
  SET_MESSAGE,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
} from "./actionTypes";

import orderServices from "../services/orderServices";
import axios from "axios";
import Cookie from "js-cookie";

const fetchOrders = () => async (dispatch) => {
  dispatch({ type: FETCH_ORDER_REQUEST });
  try {
    const { data } = await axios.get("http://localhost:8081/api/app/orders");
    dispatch({ type: FETCH_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ORDER_FAIL, payload: error.message });
  }
};

const saveOrder = (data) => async (dispatch, getState) => {
  dispatch({ type: SAVE_ORDER_REQUEST, payload: data });
  return orderServices.saveOrder(data).then(
    (response) => {
      dispatch({ type: SAVE_ORDER_SUCCESS, payload: data });
      dispatch({ type: SET_MESSAGE, payload: response.data.message });
      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({ type: SAVE_ORDER_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

const deleteOrderById = (id) => async (dispatch) => {
  dispatch({ type: DELETE_ORDER_REQUEST, payload: id });
  try {
    await axios.delete("http://localhost:8081/api/app/orders/" + id);
    dispatch({ type: DELETE_ORDER_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_ORDER_FAIL, payload: error.message });
  }
};
export default { saveOrder, deleteOrderById, fetchOrders };
