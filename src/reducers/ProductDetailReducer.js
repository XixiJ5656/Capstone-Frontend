import {
  SHOW_DETAIL_SUCCESS,
  SHOW_DETAIL_FAIL,
  SHOW_DETAIL_REQUEST,
} from "../actions/actionTypes";

const initialState = {
  loading: true,
  hasError: false,
  product: {},
};

const ProductDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_DETAIL_REQUEST:
      return { loading: true };
    case SHOW_DETAIL_SUCCESS:
      return { loading: false, product: action.payload };
    case SHOW_DETAIL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export default ProductDetailReducer;
