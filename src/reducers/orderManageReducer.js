import {
  SAVE_ORDER_SUCCESS,
  SAVE_ORDER_FAIL,
  FETCH_ORDER_SUCCESS,
  FETCH_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
} from "../actions/actionTypes";

const initialState = {
  orders: [],
  order: {},
};

const ordersReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ORDER_SUCCESS:
      return { ...state, orders: action.payload };
    case FETCH_ORDER_FAIL:
      return { ...state, error: action.payload };
    case SAVE_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
        order: action.payload,
      };
    case SAVE_ORDER_FAIL:
      return { ...state, error: action.payload };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter((item) => item.id !== action.payload),
        order: action.payload,
      };
    case DELETE_ORDER_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default ordersReducer;
