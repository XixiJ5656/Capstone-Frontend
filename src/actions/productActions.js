import axios from "axios";
import productServices from "../services/productServices";
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
  SET_MESSAGE,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
} from "./actionTypes";

const fetchProducts = () => async (dispatch) => {
  dispatch({ type: FETCH_PRODUCT_REQUEST });
  try {
    const { data } = await axios.get("http://localhost:8080/api/app/products");
    dispatch({ type: FETCH_PRODUCT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_PRODUCT_FAIL, payload: error.message });
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

const addProduct = (data) => async (dispatch) => {
  dispatch({ type: ADD_PRODUCT_REQUEST, payload: data });
  return productServices.addProduct(data).then(
    (response) => {
      dispatch({ type: ADD_PRODUCT_SUCCESS, payload: data });
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
      dispatch({ type: ADD_PRODUCT_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

const deleteProductById = (id) => async (dispatch) => {
  dispatch({ type: DELETE_PRODUCT_REQUEST, payload: id });
  try {
    await axios.delete("http://localhost:8080/api/app/products/" + id);
    dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({ type: DELETE_PRODUCT_FAIL, payload: error.message });
  }

  //   dispatch({ type: DELETE_PRODUCT_REQUEST, payload: id });
  //   return productServices.deleteProductById(id).then(
  //     (response) => {
  //       dispatch({ type: DELETE_PRODUCT_SUCCESS, payload: id });
  //       dispatch({ type: SET_MESSAGE, payload: response.data.message });
  //       return Promise.resolve();
  //     },
  //     (error) => {
  //       const message =
  //         (error.response &&
  //           error.response.data &&
  //           error.response.data.message) ||
  //         error.message ||
  //         error.toString();
  //       dispatch({ type: DELETE_PRODUCT_FAIL });
  //       dispatch({ type: SET_MESSAGE, payload: message });
  //       return Promise.reject();
  //     }
  //   );
};

export default {
  fetchProducts,
  showProductDetail,
  addProduct,
  deleteProductById,
};
