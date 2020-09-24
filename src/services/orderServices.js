import axios from "axios";

const saveOrder = (data) => {
  return axios.post("/api/app/orders", data);
};

const getAllOrders = () => {
  return axios.get("/api/app/orders");
};

const getOrderById = (id) => {
  return axios.get("/api/app/orders" + id);
};

const updateOrderById = (id, data) => {
  return axios.put("/api/app/orders" + id, data);
};

const deleteAllOrders = () => {
  return axios.delete("/api/app/orders");
};

const deleteOrderById = (id) => {
  return axios.delete("/api/app/orders" + id);
};

export default {
  saveOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteAllOrders,
  deleteOrderById,
};
