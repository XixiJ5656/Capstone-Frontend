import axios from "axios";

const register = (data) => {
  return axios.post("http://localhost:8080/api/auth/register", data);
};
const signin = (username, password) => {
  return axios
    .post("http://localhost:8080/api/auth/signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        const data = localStorage.setItem(
          "user",
          JSON.stringify(response.data)
        );
        console.log(data);
      }

      return response.data;
    });
};

const signout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  const currentUser = JSON.parse(localStorage.getItem("user"));
  return currentUser;
};

export default {
  register,
  signin,
  signout,
  getCurrentUser,
};
