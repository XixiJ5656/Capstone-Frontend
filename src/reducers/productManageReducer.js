import {
  ADD_PRODUCT_SUCCESS,
  ADD_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  FETCH_PRODUCT_SUCCESS,
  FETCH_PRODUCT_FAIL,
} from "../actions/actionTypes";

const initialState = {
  products: [],
  product: {},
};

const productsManageReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT_SUCCESS:
      return { ...state, products: action.payload };
    case FETCH_PRODUCT_FAIL:
      return { ...state, error: action.payload };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        products: [...state.products, action.payload],
        product: action.payload,
      };
    case ADD_PRODUCT_FAIL:
      return { ...state, error: action.payload };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        products: state.products.filter((item) => item.id !== action.payload),
        product: action.payload,
      };
    case DELETE_PRODUCT_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default productsManageReducer;
