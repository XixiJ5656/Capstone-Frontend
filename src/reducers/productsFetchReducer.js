import {
  FETCH_PRODUCT_FAIL,
  FETCH_PRODUCT_SUCCESS,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  error: false,
  products: [],
};

const productsFetchReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, loading: false, products: action.payload };
    case FETCH_PRODUCT_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default productsFetchReducer;
