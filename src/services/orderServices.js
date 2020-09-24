import axios from "axios";

const saveOrder = (data) => {
  return axios.post("https://xyz-ecommerce.herokuapp.com/api/app/orders", data);
};

const getAllOrders = () => {
  return axios.get("https://xyz-ecommerce.herokuapp.com/api/app/orders");
};

const getOrderById = (id) => {
  return axios.get("https://xyz-ecommerce.herokuapp.com/api/app/orders" + id);
};

const updateOrderById = (id, data) => {
  return axios.put(
    "https://xyz-ecommerce.herokuapp.com/api/app/orders" + id,
    data
  );
};

const deleteAllOrders = () => {
  return axios.delete("https://xyz-ecommerce.herokuapp.com/api/app/orders");
};

const deleteOrderById = (id) => {
  return axios.delete(
    "https://xyz-ecommerce.herokuapp.com/api/app/orders" + id
  );
};

export default {
  saveOrder,
  getAllOrders,
  getOrderById,
  updateOrderById,
  deleteAllOrders,
  deleteOrderById,
};
