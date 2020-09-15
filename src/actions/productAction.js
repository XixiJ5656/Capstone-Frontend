import axios from "axios";
import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "./actionTypes";

const listProducts = () => async (dispatch) => {
  //   dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const { data } = await axios.get("http://localhost:8080/api/app/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
  }
};
//   try {
//     const { data } = axios.get("http://localhost:8080/api/app/products");
//     dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
//     console.log("fetch products");
//   } catch (error) {
//     console.log(error);
//     dispatch({ type: PRODUCT_LIST_FAIL, payload: error.message });
//   }
// };

export default listProducts;
