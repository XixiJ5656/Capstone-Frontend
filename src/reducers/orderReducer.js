import { SAVE_ORDER_SUCCESS, SAVE_ORDER_FAIL } from "../actions/actionTypes";

const initialState = {
  orderConfirmation: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SAVE_ORDER_SUCCESS:
      return { ...state, orderConfirmation: action.payload };
    case SAVE_ORDER_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default orderReducer;
