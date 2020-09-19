import axios from "axios";
import authorizationHeader from "../authServices/AuthorizationHeader";

const API_URL = "http://localhost:8080/api/app/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserContent = () => {
  return axios.get(API_URL + "user", { headers: authorizationHeader() });
};

const getAdminContent = () => {
  return axios.get(API_URL + "admin", { headers: authorizationHeader() });
};
export default {
  getPublicContent,
  getUserContent,
  getAdminContent,
};
