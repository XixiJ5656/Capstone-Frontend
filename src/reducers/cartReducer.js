import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/actionTypes";

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const newItem = action.payload;
      const productAlreadyIn = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      if (productAlreadyIn) {
        return {
          cartItems: state.cartItems.map((item) =>
            item.id === productAlreadyIn.id ? newItem : item
          ),
        };
      }
      return { cartItems: [...state.cartItems, newItem] };
    case REMOVE_FROM_CART:
      return {
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
