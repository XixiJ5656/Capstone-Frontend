import axios from "axios";

import {
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_REQUEST,
  FETCH_PRODUCT_SUCCESS,
  SHOW_DETAIL_REQUEST,
  SHOW_DETAIL_SUCCESS,
  SHOW_DETAIL_FAIL,
  ADD_PRODUCT_REQUEST,
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
} from "./actionTypes";

const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  try {
    const { data } = await axios.get(
      "https://xyz-ecommerce.herokuapp.com/api/app/products"
    );
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAIL, payload: error.message });
  }
};

const showProductDetail = (id) => async (dispatch) => {
  dispatch({ type: SHOW_DETAIL_REQUEST, payload: id });

  try {
    const { data } = await axios.get(
      "https://xyz-ecommerce.herokuapp.com/api/app/products/" + id
    );
    dispatch({ type: SHOW_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: SHOW_DETAIL_FAIL, payload: error.message });
  }
};

const addProduct = (data) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST, payload: data });
  try {
    await axios
      .post("https://xyz-ecommerce.herokuapp.com/api/app/products", data)
      .then((response) => {
        dispatch({ type: ADD_PRODUCT_SUCCESS, payload: response.data });
      });
  } catch (error) {
    dispatch({ type: ADD_PRODUCT_FAIL, payload: error.message });
  }
};

const deleteProductById = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST, payload: id });
  try {
    await axios.delete("/api/app/products/" + id);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
  }
};

export default {
  fetchProducts,
  showProductDetail,
  addProduct,
  deleteProductById,
};
