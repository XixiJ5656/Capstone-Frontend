import axios from "axios";

import {
  PRODUCT_FETCH_FAIL,
  PRODUCT_FETCH_REQUEST,
  PRODUCT_FETCH_SUCCESS,
  SHOW_DETAIL_REQUEST,
  SHOW_DETAIL_SUCCESS,
  SHOW_DETAIL_FAIL,
} from "./actionTypes";

const fetchProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_FETCH_REQUEST });
  try {
    const { data } = await axios.get("http://localhost:8080/api/app/products");
    dispatch({ type: PRODUCT_FETCH_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_FETCH_FAIL, payload: error.message });
  }
};

const showProductDetail = (id) => async (dispatch) => {
  dispatch({ type: SHOW_DETAIL_REQUEST, payload: id });

  try {
    const { data } = await axios.get(
      "http://localhost:8080/api/app/products/" + id
    );
    dispatch({ type: SHOW_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHOW_DETAIL_FAIL, payload: error.message });
  }
};

const addProduct = () => async (dispatch) => {
  //dispatch({type:ADD_PRODUCT_REQUEST})
};
export default { fetchProducts, showProductDetail };
