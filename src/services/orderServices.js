import axios from "axios";

const saveOrder = (data) => {
  return axios.post("http://localhost:8080/api/app/orders", data);
};

const getAllOrders = () => {
  return axios.get("http://localhost:8080/api/app/orders");
};

const getOrderById = (id) => {
  return axios.get("http://localhost:8080/api/app/orders" + id);
};

const updateOrderById = (id, data) => {
  return axios.put("http://localhost:8080/api/app/orders" + id, data);
};

const deleteAllOrders = () => {
  return axios.delete("http://localhost:8080/api/app/orders");
};

const deleteOrderById = (id) => {
  return axios.delete("http://localhost:8080/api/app/orders" + id);
};

export default {
  saveOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteAllOrders,
  deleteOrderById,
};
