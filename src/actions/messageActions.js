import { SET_MESSAGE, CLEAR_MESSAGE } from "./actionTypes";

const setMessage = (message) => ({
  type: SET_MESSAGE,
  payload: message,
});

const clearMessage = () => ({
  type: CLEAR_MESSAGE,
});

export default { setMessage, clearMessage };
