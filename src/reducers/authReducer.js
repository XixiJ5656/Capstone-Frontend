import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
} from "../actions/actionTypes";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isSignedIn: true, user }
  : { isSignedIn: false, user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        isSignedIn: false,
      };
    case REGISTER_FAIL:
      return {
        ...state,
        isSignedIn: false,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        user: action.payload.user,
      };
    case SIGNIN_FAIL:
      return {
        ...state,
        isSignedIn: false,
        user: null,
      };
    case SIGNOUT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
