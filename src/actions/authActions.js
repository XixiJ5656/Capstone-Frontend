import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNIN_FAIL,
  SIGNOUT,
  SET_MESSAGE,
} from "./actionTypes";

import Authentication from "../services/AuthServices/Authentication";

const signin = (username, password) => (dispatch) => {
  dispatch({ type: SIGNIN_REQUEST, payload: { username, password } });
  return Authentication.signin(username, password).then(
    (data) => {
      console.log(data);
      dispatch({ type: SIGNIN_SUCCESS, payload: { user: data } });
      return Promise.resolve();
    },
    (error) => {
      console.log(error);
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      dispatch({ type: SIGNIN_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

const signout = () => (dispatch) => {
  localStorage.removeItem("user");
  dispatch({ type: SIGNOUT });
};

const register = (username, email, password) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST, payload: { username, email, password } });
  return Authentication.register(username, email, password).then(
    (response) => {
      dispatch({ type: REGISTER_SUCCESS });
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
      dispatch({ type: REGISTER_FAIL });
      dispatch({ type: SET_MESSAGE, payload: message });
      return Promise.reject();
    }
  );
};

export default { register, signin, signout };
